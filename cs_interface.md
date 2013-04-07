#interface url
##servlet name
/queryProduct
##post param
queryType=byCount,
Count=50

#product data struct between browser and server
##this one also the product storage format
{
    "products" : [
        {
          "number" : "IP1-CS-001",
          "model" : "iPhone5", "name" : "iPhone5 metal case", 
          "description" : "iPhone5 metal case best selling.",
          "image" : "sample.jpg",
          "suppliers" : [
              {"supplier name" : "Changjida", "price" : "6 RMB"},
              {"supplier name" : "Niumowang", "price" : "7 RMB"}
          ]
        },
        {...}
    ]
}


#PI data struct storage style
{
    "pi_no" : "PI_20130403194523000",
    "product_id_list" : [1,2,3,4,5],
    "product_list" : [
        {"product_id" : 1, "color" : "Red", "amount" : 500, "price" : "5 RMB"},
        {"product_id" : 1, "color" : "Blue", "amount" : 300, "price" : "5 RMB"},
        {"product_id" : 2, "color" : "White", "amount" : 200, "price" : "7 RMB"},
        {"product_id" : 3, "color" : "White", "amount" : 200, "price" : "9 RMB"},
        {"product_id" : 4, "color" : "White", "amount" : 200, "price" : "10.5 RMB"},
        {"product_id" : 5, "color" : "White", "amount" : 200, "price" : "3.5 RMB"}
    ],
    "creator" : "Fendo",
    "customer_name" : "Syed",
    "order_belong_to" : "the order number",
    "state" : 0,
    "packing" : {
        "box_amount" : 2,
        "boxes" : [
            {"box_number" : 1, "box_content" : [
                {"product_id" : 1, "color" : "Red", "amount" : 250},
                {"product_id" : 1, "color" : "Red", "amount" : 250}
            ] },
            {"box_number" : 2, "box_content" : [
                {"product_id" : 1, "color" : "Blue", "amount" : 300},
                {"product_id" : 2, "color" : "White", "amount" : 200},
                {"product_id" : 3, "color" : "White", "amount" : 200},
                {"product_id" : 4, "color" : "White", "amount" : 200},
                {"product_id" : 5, "color" : "White", "amount" : 200}
            ] }
        ]
    },
    "shippment" : {"shipping_by" : "DHL", "tracking_number" : "2001234897D"}
}

#/pi/queryPIByCount interface description
###description
query PI object by count index
###request type
post
###input
{'maxcount' : QUERY_PI_ONCE_COUNT, 'current' : count}
###output
The PI data storage, but replace the value of "product_id_list" to the real product data

#/pi/getProductInPI interface description
###description
Use to get one product in the specified PI
###request type
post
###input
{"pi_no" : pi_no, "product_id" : productId}
###output
The PI data storage, but replace the value of "product_id_list" to the real product data. And contains only one product data.