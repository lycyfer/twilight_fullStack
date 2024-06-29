import prisma from "../lib/prisma.js";


export const addBasket = async (req, res) => {
  const { userId, productId, quantity, size, color, fit, price } = req.body;
  console.log(userId, productId, quantity, size, color, fit, price);

  try {
    let basket = await prisma.basket.findUnique({
      where: { userId },
      include: { items: true }
    });
    console.log(basket)
    if (!basket) {
      basket = await prisma.basket.create({
        data: { userId }
      });
    }

    let updatedItem;
    const existingItem = basket.items.find(item =>
      item.productId === productId &&
      item.size === size &&
      item.color === color
    );

    if (existingItem) {
      updatedItem = await prisma.basketItem.update({
        where: { id: existingItem.id },
        data: { quantity: { increment: quantity } }
      });
    } else {
      updatedItem = await prisma.basketItem.create({
        data: {
          basket: { connect: { id: basket.id } },
          product: { connect: { id: productId } },
          quantity,
          size,
          color,
          price
        }
      });
    }

    // Re-fetch the basket to get the updated items and calculate the total price
    basket = await prisma.basket.findUnique({
      where: { id: basket.id },
      include: { items: true }
    });

    const totalPrice = basket.items.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);

    // Update the total price in the basket
    await prisma.basket.update({
      where: { id: basket.id },
      data: { totalPrice }
    });

    res.status(200).json(updatedItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add product to basket" });
  }
};


export const getBasket = async (req, res) => {

  const { id } = req.params
  console.log(id);
  try {
    const basket = await prisma.basket.findFirst({
      where: { userId: id },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    });

    if (basket) {
      res.status(200).json(basket);
    } else {
      res.status(404).json({ message: "Basket not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get basket" });
  }
};

export const purchaseBasket = async (req, res) => {
  const { userId } = req.body;
  console.log(userId)
  try {
    const basket = await prisma.basket.findUnique({
      where: { userId },
      include: { items: true },
    });

    if (!basket || basket.items.length === 0) {
      return res.status(400).json({ message: 'Basket is empty or does not exist' });
    }

    const pendingOrder = await prisma.order.findFirst({
      where: { userId, status: 'waitingForPayment' },
      include: { orderItems: true },
    });

    const orderItems = [];
    let totalPrice = 0;

    for (const item of basket.items) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
        select: { name: true, price: true },
      });

      const existingOrderItem = pendingOrder?.orderItems.find(
        (orderItem) => orderItem.productId === item.productId && orderItem.size === item.size
      );

      if (existingOrderItem) {
        const updatedQuantity = existingOrderItem.quantity + item.quantity;
        const updatedTotalPrice = updatedQuantity * product.price;
        await prisma.orderItem.update({
          where: { id: existingOrderItem.id },
          data: { quantity: updatedQuantity, totalPrice: updatedTotalPrice },
        });

        totalPrice += updatedTotalPrice; e
      } else {
        const itemTotalPrice = item.quantity * product.price;
        orderItems.push({
          quantity: item.quantity,
          productId: item.productId,
          productName: product.name,
          size: item.size,
          totalPrice: itemTotalPrice,
        });

        totalPrice += itemTotalPrice;
      }
    }




    console.log('Total price before creating order:', totalPrice); // Add this line to log the totalPrice

    const order = await prisma.order.create({
      data: {
        userId,
        totalPrice,
        orderItems: {
          createMany: {
            data: orderItems,
          },
        },
      },
    });
    setTimeout(async () => {
      const updatedOrder = await prisma.order.findUnique({
        where: { id: order.id },
      });


      if (updatedOrder && updatedOrder.status === 'waitingForPayment') {
        await prisma.order.delete({
          where: { id: order.id },
        });
      }
    }, 10 * 60 * 1000);

    const serverTime = new Date();


    await prisma.basketItem.deleteMany({
      where: { basketId: basket.id },
    });


    await prisma.basket.update({
      where: { id: basket.id },
      data: { totalPrice: 0 },
    });

    res.status(200).json({ order, serverTime });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to purchase basket' });
  }
};

export const increaseQuantity = async (req, res) => {
  const { userId, productId, size, quantity } = req.body;

  try {
    const basketItem = await prisma.basketItem.findFirst({
      where: {
        basket: {
          userId,
        },
        productId,
        size
      }
    });

    if (!basketItem) {
      return res.status(404).json({ message: "Item not found in the basket" });
    }

    const updatedItem = await prisma.basketItem.update({
      where: {
        id: basketItem.id
      },
      data: {
        quantity: {
          increment: quantity
        }
      }
    });

    res.status(200).json(updatedItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to increase item quantity" });
  }
};

export const decreaseQuantity = async (req, res) => {
  const { userId, productId, size } = req.body;

  try {
    const basketItem = await prisma.basketItem.findFirst({
      where: {
        basket: {
          userId,
        },
        productId,
        size
      }
    });

    if (!basketItem) {
      return res.status(404).json({ message: "item not found in the basket" });
    }

    if (basketItem.quantity === 1) {
      return res.status(400).json({ message: "Cannot decrease quantity below 1" });
    }

    if (basketItem.quantity - 1 === 0) {
      return res.status(400).json({ message: "Cannot decrease quantity to 0" });
    }

    const updatedItem = await prisma.basketItem.update({
      where: {
        id: basketItem.id
      },
      data: {
        quantity: {
          decrement: 1
        }
      }
    });

    console.log(updatedItem);
    res.status(200).json(updatedItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "failed to decrease item quantity" });
  }
};


export const getOrder = async (req, res) => {
  const { id } = req.params
  console.log(id)
  try {
    const orders = await prisma.order.findMany({
      where: {
        userId: id
      },
      include: {
        orderItems: true
      },
      orderBy: {
        createdAt: "desc"
      }
    })
    console.log(orders)
    res.status(200).json(orders)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "failed to get orders" })
  }

}

export const removeFromBasket = async (req, res) => {
  const { id } = req.params;

  try {

    const deletedItem = await prisma.basketItem.delete({
      where: {
        id: id
      }
    });


    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found in basket' });
    }


    res.status(200).json({ message: 'Item removed from basket' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to remove item from basket' });
  }
};


export const deleteOrder = async (req, res) => {
  const { id } = req.params;

  try {

    const deletedOrder = await prisma.order.delete({
      where: {
        id: id,
      },
    });

    if (!deletedOrder) {
      return res.status(404).json({ message: 'Заказ не найден' });
    }


    await prisma.orderItem.deleteMany({
      where: {
        orderId: id,
      },
    });

    res.status(200).json({ message: 'Заказ успешно удален' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Ошибка при удалении заказа' });
  }
};