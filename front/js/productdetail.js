var xmlhttp = new XMLHttpRequest();

xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
        if (xmlhttp.status == 200) {

            let result = "";
            let product = JSON.parse(xmlhttp.responseText);
            result = '<img src="' + product.imageUrl + '" alt="' + product.altTxt + '"></img>'
            document.getElementById("itemimg").innerHTML = result;
            document.getElementById("description").innerHTML = product.description;
            document.getElementById("price").innerHTML = product.price;
            document.getElementById("title").innerHTML = product.name;
            CommandButton(product)
            result = '';
            product.colors.forEach(
                function (color, index) {
                    result += '<option value="' + color + '">' + color + '</option>'
                })
            document.getElementById("colors").innerHTML = result;
        }

        else if (xmlhttp.status == 400) {
            alert('There was an error 400');
        }
        else {
            alert('something else other than 200 was returned');
        }

        function CommandButton(product) {
            const button = document.getElementById('addToCart');
            button.addEventListener('click', function () {
                let cartContent = JSON.parse(localStorage.getItem('cartContent'));
                let quantity = parseInt(document.getElementById('quantity').value);
                if (cartContent === null) {
                    cartContent = [];
                    let produit = saveProducForStorage(product, quantity);

                    cartContent.push(produit);
                    localStorage.setItem('cartContent', JSON.stringify(cartContent));

                }
                else {
                    let p = cartContent.filter(c => c.id === product._id);
                    if (p != null) {

                        p[0].nombre += parseInt(quantity);
                        localStorage.setItem('cartContent', JSON.stringify(cartContent));
                    }
                    else {
                        let produit = saveProducForStorage(product, quantity);

                        cartContent.push(produit);
                        localStorage.setItem('cartContent', JSON.stringify(cartContent));
                    }


                }

            });
        }
        function saveProducForStorage(product, quantity) {
            return {
                'name': product.name,
                'price': product.price,
                'id': product._id,
                'nombre': quantity,
            }
        }
    }
}


xmlhttp.open("GET", "http://localhost:3000/api/products/" + window.location.href.split("=")[1]);
xmlhttp.send();


