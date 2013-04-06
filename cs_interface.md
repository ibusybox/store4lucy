#interface url
##servlet name
/queryProduct
##post param
queryType=byCount,
Count=50

#product data struct between browser and server
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


#product data struct
###number
1

###name
Metal case for iPhone4, iPhone5

###Thumbnail
![image](sample.jpg)

********
###model
iPhone5,iPhone4


###color
red, white, black

###description
iPhone5 metal case best selling.

###material
PC

###image
![image](sample.jpg)

###suppliers
********
####supplier name
Chuangjida
####price
6 RMB
********
####supplier name
Niumowang
####price
7 RMB

#PI data struct storage style
{
    "pi_no" : "pi_20130403194523000",
    "product_list" : [1,2,3,4,5],
    "creator" : "Lucy",
    "order_belong_to" : "the order number",
    "state" : 0
}

#PI data struct between browser and server
{
    "pi_no" : "pi_20130403194523000",
    "product_list" : [
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
        {… more products … }
    ],
    "creator" : "Lucy",
    "order_belong_to" : "the order number",
    "state" : 0
}