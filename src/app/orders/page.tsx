import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import React from "react";

const orders = [
  {
    id: "INV001",
    paymentStatus: "Paid",
    paymentMethod: "Credit Card",
    dateTime: "22.05.24 13.22",
    orderStatus: "Completed",
    amount: "$250.00",
  },
  {
    id: "INV002",
    paymentStatus: "Paid",
    paymentMethod: "Credit Card",
    dateTime: "22.05.24 13.22",
    orderStatus: "Completed",
    amount: "$250.00",
  },
  {
    id: "INV003",
    paymentStatus: "Paid",
    paymentMethod: "Credit Card",
    dateTime: "22.05.24 13.22",
    orderStatus: "Completed",
    amount: "$250.00",
  },
];

const Orders = () => {
  return (
    <Card className="container mt-6 mx-auto">
      <CardHeader>
        <CardTitle>Orders</CardTitle>
        <CardDescription>My complete order history</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Id</TableHead>
              <TableHead>Payment Status</TableHead>
              <TableHead>Payment Method</TableHead>
              <TableHead>Date Time</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.paymentStatus}</TableCell>
                <TableCell>{order.paymentMethod}</TableCell>
                <TableCell>{order.dateTime}</TableCell>
                <TableCell>
                  <Badge className="border-green-500 text-gray-700 bg-white font-semibold">
                    {order.orderStatus}
                  </Badge>
                </TableCell>
                <TableCell>{order.amount}</TableCell>
                <TableCell>
                  <Link
                    className="underline text-primary"
                    href={`/order-details/${order.id}`}
                  >
                    More details
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default Orders;
