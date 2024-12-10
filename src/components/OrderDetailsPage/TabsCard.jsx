import { React, useState } from 'react';
import {
  Card,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Typography,
  Button,
} from '@material-tailwind/react';

import {ChevronUp, ChevronDown} from "lucide-react";

export default function TabsCard({ order }) {
  if (!order) return null;

  const totalPrice = order.products.reduce((sum, product) => sum + (product.price * product.quantity), 0);
  const productsCount = order.products.reduce((sum, product) => sum + product.quantity, 0);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const displayedProducts = showAllProducts ? order.products : [order.products[0]];

  return (
    <Card>
      <Tabs value="detail-order">
        <TabsHeader
          className="rounded-none border-b border-gray-200 bg-transparent p-0 overflow-x-auto"
          indicatorProps={{
            className: "bg-transparent border-b-2 border-purple-500 shadow-none rounded-none",
          }}
        >
          <Tab value="detail-order" className="text-gray-900">
            Detail Order
          </Tab>
          <Tab value="rider-information" className="text-gray-900">
            Rider Information
          </Tab>
          <Tab value="customer-information" className="text-gray-900">
            Customer Information
          </Tab>
          <Tab value="documents" className="text-gray-900">
            Documents
          </Tab>
        </TabsHeader>

        <TabsBody>
          <TabPanel value="detail-order">
            <div className="px-4 py-2 flex flex-col items-center md:items-start gap-8">
              {displayedProducts.map((product, index) => (
                <div key={index} className='w-full'>

                  <div className="pb-4 flex flex-col md:flex-row items-center md:items-start gap-6 border-b border-gray-300">
                    <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>

                    <div className="flex-1 space-y-6 w-full">
                      <div className="space-y-1">
                        <div className="flex flex-col md:flex-row justify-between gap-4">
                          <div className="w-full md:w-auto">
                            <Typography color="gray" className="font-medium text-sm">
                              Product Name
                            </Typography>
                            <Typography color="black" className="font-semibold text-sm">
                              {product.name}
                            </Typography>
                          </div>
                          <div className="w-full md:w-auto md:text-right">
                            <Typography color="gray" className="font-medium text-sm">
                              Payment Method
                            </Typography>
                            <Typography color="black" className="font-semibold text-sm">
                              {order.paymentMethod}
                            </Typography>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-row justify-between items-center w-full pt-4 border-t border-gray-200">
                        <div>
                          <Typography color="gray" className="font-medium text-sm">
                            Quantity
                          </Typography>
                          <div className="flex items-center gap-2">
                            <Typography color="black" className="font-semibold text-sm">
                              {product.quantity} x ${product.price}
                            </Typography>
                          </div>
                        </div>
                        <div className="w-auto text-right">
                          <Typography color="gray" className="font-medium text-sm">
                            Price
                          </Typography>
                          <div className="flex justify-end">
                            <Typography color="black" className="font-semibold text-sm">
                              ${(product.quantity * product.price)}
                            </Typography>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {order.products.length > 1 && (
                <div className='mt-[-1rem] w-full flex justify-center'>
                  <Button
                  variant="text"
                  className='show-more-btn text-xs flex flex-row gap-2'
                  onClick={() => setShowAllProducts(!showAllProducts)}
                  >
                    {showAllProducts ? (
                      <>Show Less <ChevronUp className="h-4 w-4"/></>
                    ) : (
                      <>Show More <ChevronDown className="h-4 w-4"/></>
                    )}
                  </Button>
                </div>
              )}

              <div className='flex flex-row justify-between w-full mt-[-2rem]'>         
                <Typography className="font-semibold text-black text-sm">
                  <span className='text-gray-700'>Total Products:</span> {productsCount}
                </Typography>
                <div className='flex justify-end text-right'>
                <Typography className="font-semibold text-black text-sm">
                  <span className='text-gray-700'>Total Price:</span> ${totalPrice}
                </Typography>
                </div>
              </div>


            </div>
          </TabPanel>

          <TabPanel value="rider-information">
            <div className="p-4">
              <Typography>Rider: {order.riderName}</Typography>
            </div>
          </TabPanel>

          <TabPanel value="customer-information">
            <div className="p-4">
              <Typography>Customer: {order.customerName}</Typography>
            </div>
          </TabPanel>

          <TabPanel value="documents">
            <div className="p-4">
              <Typography>Order #{order.id} Documents</Typography>
            </div>
          </TabPanel>

        </TabsBody>
      </Tabs>
    </Card>
  );
}