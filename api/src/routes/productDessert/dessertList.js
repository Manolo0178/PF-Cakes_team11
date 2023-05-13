const dessertList = [

    {
      "name": "Lemon pie",
      "description": "Delicious lemon dessert with a flaky pastry base and a smooth, creamy lemon filling. Decorated with lemon zest and served cold.",
      "summary": "Lemon pie is a classic dessert that combines the tartness of lemon with the sweetness of flaky pastry. Perfect for any occasion.",
      "image": "https://cdn.pixabay.com/photo/2017/03/15/19/18/tartlet-2147173_1280.jpg",
      "price": 10,
      "desserts": ["Tarts"]
    },
    {
      "name": "Frutilla",
      "description": "A delicious fresh strawberry tart with a flaky pastry base and a creamy filling of mascarpone cheese and vanilla cream. Decorated with fresh strawberries and glaze.",
      "summary": "The strawberry tart is a delightful combination of fresh fruit and vanilla cream on a flaky pastry base. A perfect dessert for strawberry season.",
      "image": "https://cdn7.kiwilimon.com/recetaimagen/24285/19415.jpg",
      "price": 20,
      "desserts": ["Tarts"]
    },
    {
      "name": "Apple Pie",
      "description": "A classic apple pie with a flaky pastry base and a filling of freshly sliced apples, cinnamon, and sugar. Served hot with vanilla ice cream.",
      "summary": "Apple pie is a classic and comforting dessert that combines the sweetness of apples with the spice of cinnamon. Perfect for a chilly autumn afternoon.",
      "image": "https://perudelights.com/wp-content/uploads/2012/08/P10198201.jpg",
      "price": 25,
      "desserts": ["Tarts"]
    },
    {
      "name": "Fruit Salad",
      "description": "A mix of seasonal fresh fruits with a touch of honey and lemon syrup. Served in a glass cup and decorated with fresh mint.",
      "summary": "Fruit salad is a healthy and refreshing option for a light dessert after a heavy meal. Perfect for the summer.",
      "image": "https://www.createwithnestle.ph/sites/default/files/srh_recipes/8a45d2c2a123a2e61542bce83a089b4e.jpg",
      "price": 26,
      "desserts": ["Fruit salads"]
    },
    {
      "name": "Custom Themed Cake (x servings)",
      "description": "A personalized themed cake with the design and flavor of your choice. You can choose from different flavors such as vanilla, chocolate, strawberry, and more.",
      "summary": "A custom themed cake is the perfect way to celebrate a special occasion. You can choose the flavor and design you want to make it unique and memorable.",
      "image": "https://thedessertparlour.com.au/wp-content/uploads/2020/12/cake-1.jpg",
      "price": 14,
      "desserts": ["Custom Cakes"]
    },
    {
      "name": "Chajá",
      "description": "A typical Uruguayan dessert composed of layers of fluffy sponge cake, dulce de leche, meringue, whipped cream, and peaches in syrup. Decorated with almonds and shredded coconut.",
      "summary": "Chajá is a decadent and delicious dessert that combines layers of different textures and flavors. Perfect for those looking for something sweet and comforting.",
      "image": "https://lacocinadefrabisa.lavozdegalicia.es/wp-content/uploads/2015/04/TARTA-CHAJA-3-ok.jpg",
      "price": 12,
      "desserts": ["Tarts"]
    },
    {
      "name": "Pavlova",
      "description": "A crispy on the outside and soft on the inside tart made of meringue, served with whipped cream and seasonal fresh fruits such as strawberries, kiwi, and mango.",
      "summary": "Pavlova is a light and refreshing dessert that combines the sweetness of meringue with the acidity of fresh fruits. Perfect for a summer afternoon.",
      "image": "https://recetinas.com/wp-content/uploads/2022/07/tarta-pavlova-casera.jpg.webp",
      "price": 10,
      "desserts": ["Tarts"]
    },
    {
      "name": "Chimuelo",
      "description": "A traditional Chilean cake made with sponge cake and filled with manjar, a typical sweet milk caramel from the region. Decorated with meringue and cherries in syrup.",
      "summary": "Chimuelo is a delicious and comforting dessert that combines the sweetness of manjar with the light texture of meringue. Perfect for any occasion.",
      "image": "https://i.pinimg.com/originals/e6/de/14/e6de141f1557f66c6645a3ec44544747.jpg",
      "price": 10,
      "desserts": ["Tarts"]
    },
    {
      "name": "Fruit Salad with Yogurt",
      "description": "A delicious mix of fresh fruit cut into pieces, similar to fruit salad, but with the addition of natural yogurt. The yogurt adds a creamy texture and slightly acidic flavor that complements the sweetness of the fruits perfectly.",
      "summary": "Fruit salad with yogurt is a variation of fruit salad that adds a touch of creaminess and acidity thanks to the natural yogurt.",
      "image": "https://eclecticrecipes.com/wp-content/uploads/2012/02/striped-fruit-1.jpg",
      "price": 11,
      "desserts": ["Fruit salads"]
    },
    {
      "name": "Chocotorta",
      "description": "A chocolate cake made with chocolate cookies and cream cheese, decorated with whipped cream and grated chocolate.",
      "summary": "Chocotorta is an indulgent and delicious dessert that combines the richness of chocolate with the smoothness of cream cheese. Perfect for chocolate lovers.",
      "image": "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/038/681/products/chocotorta-tn31-9128995961d0253de916579846626575-640-0.webp",
      "price": 22,
      "desserts": ["Tarts"]
    },
    {
      "name": "Tiramisu",
      "description": "A classic Italian dessert made of layers of soaked coffee biscuits, mascarpone cream, and dusted cocoa powder. Served chilled and decorated with chocolate shavings.",
      "summary": "Tiramisu is an elegant and sophisticated dessert that combines the taste of coffee with the creaminess of mascarpone. Perfect for a special dinner.",
      "image": "https://i.blogs.es/740b08/1366_2000/1366_2000.jpg",
      "price": 15,
      "desserts": ["Tarts"]
    },
    {
      "name": "Cheesecake",
      "description": "A creamy cheesecake made with cream cheese, eggs, sugar, and a base of crushed biscuits. Decorated with fresh seasonal fruits.",
      "summary": "Cheesecake is a classic and decadent dessert that combines the creaminess of cheese with the crunchy texture of the biscuit base. Perfect for any occasion.",
      "image": "https://www.comedera.com/wp-content/uploads/2022/11/cheesecake-de-durazno-CPG_CDD190220002.jpg",
      "price": 24,
      "desserts": ["Tarts"]
    },
    {
      "name": "Patagonian Roll Cake",
      "description": "A rolled cake made with fluffy sponge cake filled with dulce de leche and nuts, and topped with a layer of melted chocolate.",
      "summary": "The Patagonian Roll Cake is a traditional dessert from the Argentine Patagonia that combines the sweetness of dulce de leche with the crunchy texture of nuts and chocolate. Perfect for a family gathering.",
      "image": "https://i.redd.it/xodg9k1b35l41.jpg",
      "price": 23,
      "desserts": ["Tarts"]
    },
    {
      "name": "Meringue Brownie",
      "description": "A dense and moist chocolate brownie topped with a layer of meringue and baked in the oven until the meringue is golden brown.",
      "summary": "The Meringue Brownie is a decadent and delicious dessert that combines the rich flavor of chocolate with the sweetness of meringue. Perfect for chocolate lovers.",
      "image": "https://i0.wp.com/www.onegreenplanet.org/wp-content/uploads/2019/02/brownie_meringue_recipe.jpg?fit=640%2C480&ssl=1",
      "price": 25,
      "desserts": ["Tarts"]
    },
    {
      "name": "Cupcakes",
      "description": "Small individual cakes made with a sponge cake base and decorated with buttercream and different types of toppings, such as chocolate chips, fresh fruits, and sprinkles.",
      "summary": "Cupcakes are a fun and versatile dessert that can be customized with different flavors and decorations. Perfect for any celebration.",
      "image": "https://assets.tmecosys.com/image/upload/t_web600x528/img/recipe/ras/Assets/6A7045AE-907E-4ED1-9797-691CB779FF6C/Derivates/441B07CC-87F6-4A51-B153-437882AC756D.jpg",
      "price": 12,
      "desserts": ["Individual pastries"]
    },
    {
      "name": "Mini Lemon Tarts",
      "description": "Mini lemon tarts made with a crushed cookie base and filled with a mixture of lemon juice, condensed milk, and whipped cream. Decorated with lemon slices and lemon zest.",
      "summary": "Mini Lemon Tarts are a refreshing and light dessert that combines the acidity of lemon with the smoothness of whipped cream. Perfect for a summer afternoon.",
      "image": "https://ketocookingchristian.com/wp-content/uploads/2019/06/Keto-Mini-Lemon-Curd-Tarts3-1-835x1024.jpeg",
      "price": 14,
      "desserts": ["Individual tarts"]
    },
    {
      "name": "Mini Cheesecake",
      "description": "Small creamy cheesecakes made with cream cheese, eggs, sugar, and a crushed cookie crust. Topped with fresh seasonal fruits.",
      "summary": "Mini Cheesecakes are a miniature version of the classic cheesecake dessert. They combine the creaminess of the cheese with the crunchiness of the cookie crust. Perfect for a party or event.",
      "image": "https://preppykitchen.com/wp-content/uploads/2019/10/mini-cheesecake-feature.jpg",
      "price": 15,
      "desserts": ["Individual tarts"]
    },
    {
      "name": "Rogelitos",
      "description": "Small individual portions of Rogel, an Argentinean cake made of thin and crispy layers of baked dough, filled with dulce de leche and topped with meringue.",
      "summary": "Rogelitos are a miniature version of the classic Argentinean dessert, Rogel. They are small individual portions that combine the crunchiness of the dough with the sweetness of dulce de leche and meringue. Perfect for a light snack or dessert.",
      "image": "https://cdn0.recetasgratis.net/es/posts/8/7/5/mini_rogelitos_76578_600.webp",
      "price": 10,
      "desserts": ["Breakfast/snacks"]
    },
    {
      "name": "Mini Brownies",
      "description": "Small individual portions of dense and moist chocolate brownies, topped with a layer of melted chocolate.",
      "summary": "Mini Brownies are a miniature version of the classic chocolate brownie dessert. They are small individual portions that combine the rich flavor of chocolate with a dense and moist texture. Perfect for a snack or as a dessert after a meal.",
      "image": "https://www.deli.com.co/GrupoProductoImagen/gp282/Mini-Brownies-por-12-unidades-1.jpg",
      "price": 16,
      "desserts": ["Breakfast/snacks"]
    },
    {
      "name": "Mini Fruit Tarts",
      "description": "Small individual portions of fruit tarts made with a shortcrust pastry base and filled with fresh seasonal fruits.",
      "summary": "Mini Fruit Tarts are a miniature version of the classic fruit tart dessert. They are small individual portions that combine the crunchiness of the pastry base with the freshness of seasonal fruits. Perfect for a light snack or dessert.",
      "image": "https://apronandwhisk.com/wp-content/uploads/2021/04/Fruit-tarts-food-photography-5-819x1024.jpg",
      "price": 20,
      "desserts": ["Breakfast/snacks"]
    },
    {
      "name": "Chocolate Alfajores",
      "description": "Small chocolate cookies filled with dulce de leche and covered with shredded coconut.",
      "summary": "Chocolate Alfajores are a version of the classic Argentine dessert alfajor, but with a chocolate coating instead of a baked dough layer. They combine the rich flavor of chocolate with the sweetness of dulce de leche and the crunchy texture of coconut. Perfect for a snack or dessert after a meal.",
      "image": "https://assets.elgourmet.com/wp-content/uploads/2023/03/cover_bpl03xf1vk_alfajores-marplatenses-juan-manuel-herrera-el-gourmet-1024x683.jpg.webp",
      "price": 19,
      "desserts": ["Breakfast/snacks"]
    },
    {
      "name": "Kids' Boxes",
      "description": "Boxes with a selection of various desserts, such as cupcakes, decorated cookies, mini fruit tarts, and other sweets, designed for kids.",
      "summary": "Kids' Boxes are perfect for birthday parties or events for kids. They offer a variety of desserts and sweets that are fun and attractive to children.",
      "image": "https://ae01.alicdn.com/kf/H6181feb9f8264c5eb856ff2a9c65fd33c/Cajas-de-papel-de-embalaje-de-galletas-Mochi-caja-de-regalo-de-pasteler-a-de-postre.jpg_Q90.jpg_.webp",
      "price": 13,
      "desserts": ["Breakfast/snacks"]
    }
  ]
module.exports = { dessertList }