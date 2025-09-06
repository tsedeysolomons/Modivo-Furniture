"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("profile");

  const authState = {
    user: {
      name: "John Doe",
      email: "john@example.com",
    },
    orders: [
      {
        id: "123",
        date: "2025-09-01",
        status: "delivered",
        items: [
          { id: "p1", name: "Sofa", quantity: 1, price: 500, image: "" },
          { id: "p2", name: "Chair", quantity: 2, price: 100, image: "" },
        ],
        total: 700,
      },
    ],
    wishlist: [
      { id: "w1", name: "Table", price: 300, image: "" },
      { id: "w2", name: "Lamp", price: 50, image: "" },
    ],
    addresses: [
      {
        id: "a1",
        name: "Home",
        details: "123 Main St, Addis Ababa, Ethiopia",
      },
    ],
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-500 text-white";
      case "pending":
        return "bg-yellow-500 text-white";
      case "canceled":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-300 text-black";
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
          <TabsTrigger value="addresses">Addresses</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Profile */}
      {activeTab === "profile" && (
        <Card className="mt-6 border-border bg-card">
          <CardContent className="p-6 space-y-4">
            <h2 className="text-2xl font-bold">Profile</h2>
            <p className="text-muted-foreground">Manage your account details</p>
            <div>
              <label className="block text-sm font-medium">Name</label>
              <Input defaultValue={authState.user.name} />
            </div>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <Input defaultValue={authState.user.email} />
            </div>
            <Button className="mt-4">Update Profile</Button>
          </CardContent>
        </Card>
      )}

      {/* Orders */}
      {activeTab === "orders" && (
        <div className="space-y-6 mt-6">
          <div>
            <h1 className="text-3xl font-bold font-serif text-foreground mb-2">
              Order History
            </h1>
            <p className="text-muted-foreground">
              Track and manage your orders
            </p>
          </div>

          <div className="space-y-4">
            {authState.orders.map((order) => (
              <Card key={order.id} className="border-border bg-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-foreground">
                        Order {order.id}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Placed on {order.date}
                      </p>
                    </div>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status.charAt(0).toUpperCase() +
                        order.status.slice(1)}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center space-x-4"
                      >
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-foreground">
                            {item.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                        <p className="font-medium text-foreground">
                          ${item.price * item.quantity}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                    <p className="text-lg font-semibold text-foreground">
                      Total: ${order.total}
                    </p>
                    <div className="space-x-2">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      {order.status === "delivered" && (
                        <Button variant="outline" size="sm">
                          Reorder
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Wishlist */}
      {activeTab === "wishlist" && (
        <div className="space-y-6 mt-6">
          <h2 className="text-2xl font-bold">Wishlist</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {authState.wishlist.map((item) => (
              <Card key={item.id} className="border-border bg-card">
                <CardContent className="p-4 flex items-center space-x-4">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      ${item.price}
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Addresses */}
      {activeTab === "addresses" && (
        <div className="space-y-6 mt-6">
          <h2 className="text-2xl font-bold">Saved Addresses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {authState.addresses.map((address) => (
              <Card key={address.id} className="border-border bg-card">
                <CardContent className="p-4">
                  <h3 className="font-semibold">{address.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {address.details}
                  </p>
                  <div className="flex space-x-2 mt-2">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <Button variant="destructive" size="sm">
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <Button>Add New Address</Button>
        </div>
      )}
    </div>
  );
}
