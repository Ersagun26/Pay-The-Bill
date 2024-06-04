
//Tüm "Sepete Ekle" düğmelerini seçiyoruz. Bu düğmeler btn-primary sınıfına sahip.
let addToCartButtons = document.getElementsByClassName('btn-secondary')

//Sepet içeriğinin eklenmesi gereken yeri (yani table body) seçiyoruz.
let cartContainer = document.getElementsByTagName('tbody')[0]

//Sepetteki miktar kutucuklarını seçiyoruz.
let quantityFields = document.getElementsByClassName('num')

//Sepetten öğeleri kaldırma düğmelerini seçiyoruz.
let delete_buttons = document.getElementsByClassName('uk-button-danger')

// Tüm "Sepete Ekle" düğmelerini tek tek dolaşıyoruz.
for(let i = 0; i < addToCartButtons.length; i++){
 //Her bir düğmeye tıklama olayı ekliyoruz. Bir düğmeye tıkladığında addToCart adlı fonksiyon çalışacak.
    addToCartButtons[i].addEventListener('click', addToCart)
    
}
// Bu fonksiyon, bir ürünü sepete eklemek için.
function addToCart(event){

    // Yeni bir satır (tablo satırı) oluşturuyoruz. Bu satır sepete eklenecek.
    let itemContainer = document.createElement('tr')

   //Tıklanan düğmeyi btn değişkenine atıyoruz.
    let btn = event.target
   

    //Tıklanan düğmenin iki üst seviyedeki ebeveynini alıyoruz. Bu, ürün görseli, adı ve fiyatının bulunduğu yer.
    let btnGrandParent = btn.parentElement.parentElement

    //Tıklanan düğmenin bir üst seviyedeki ebeveynini alıyoruz. Bu, ürün adı ve fiyatının bulunduğu yer.
    let btnParent = btn.parentElement

   // Ürün görselinin kaynağını alıyoruz.
    let itemImage = btnGrandParent.children[0].src

    //Ürün adını alıyoruz.
    let itemName = btnParent.children[0].innerText

    //Ürün fiyatını alıyoruz.
    let itemPrice = btnParent.children[1].innerText
    
    //Yeni oluşturduğumuz satıra ürün bilgilerini ekliyoruz. Bu satırda ürün görseli, adı, fiyatı, miktar kutucuğu ve kaldırma düğmesi bulunacak.
    itemContainer.innerHTML = `

    <td><img class="uk-preserve-width uk-border-circle" src=${itemImage} width="60" alt=""></td>
    <td class="uk-table-link">
        <h3 class = "item-name">${itemName}</h3>
    </td>
    <td class="uk-text-truncate item-price"><h3>${itemPrice}</h3></td>
    <td><input  type= 'number' class = 'num' value = '1'></td>
    <td class="uk-text-truncate total-price"><h3>${itemPrice}</h3></td>
    <td><button class="remove uk-button uk-button-danger" type="button">Remove</button></td>
`
  //Yeni oluşturduğumuz satırı sepetin içine ekliyoruz.
    cartContainer.append(itemContainer)
  
    // Tüm miktar kutucuklarını tek tek dolaşıyoruz.Her miktar kutucuğunun başlangıç değerini 1 yapıyoruz.
    for(let i = 0; i < quantityFields.length; i++){
        quantityFields[i].value = 1
        quantityFields[i].addEventListener('change', totalCost)//Her miktar kutucuğuna değişiklik olayı ekliyoruz. 
                                                               //Miktar değiştiğinde totalCost fonksiyonu çalışacak.
                
    }

    // Tüm kaldırma düğmelerini tek tek dolaşıyoruz.
    for(let i = 0; i < delete_buttons.length; i++){
        delete_buttons[i].addEventListener('click', removeItem)//Her kaldırma düğmesine tıklama olayı ekliyoruz. 
                                                               //Tıklanıldığında removeItem fonksiyonu çalışacak.
    }

    grandTotal()

}

// Bu fonksiyon, miktar değiştiğinde çalışacak ve toplam fiyatı güncelleyecek.
function totalCost(event){
    let quantity = event.target //Miktar kutucuğunu quantity değişkenine atıyoruz.
    quantity_parent = quantity.parentElement.parentElement//Miktar kutucuğunun bulunduğu satırı alıyoruz.
    price_field = quantity_parent.getElementsByClassName('item-price')[0]//Ürün fiyatının bulunduğu alanı alıyoruz.
    total_field = quantity_parent.getElementsByClassName('total-price')[0]//Toplam fiyatın bulunduğu alanı alıyoruz.
    price_field_content = price_field.innerText.replace('$', '')//Ürün fiyatını dolarsız bir şekilde alıyoruz.
    total_field.children[0].innerText = '$' +  quantity.value * price_field_content//Miktar ile fiyatı çarparak yeni toplam fiyatı güncelliyoruz.
    grandTotal()//Genel toplamı güncellemek için grandTotal fonksiyonunu çağırıyoruz.
    if(isNaN(quantity.value)|| quantity.value <= 0){
    quantity.value = 1//Eğer miktar geçersiz (sayı değil) veya 0'dan küçükse, miktarı 1 yapıyoruz.
    
    }

}

// Bu fonksiyon, sepetteki tüm ürünlerin toplam fiyatını hesaplayacak.
function grandTotal(){
    let total = 0//Toplam fiyatı tutacak değişkeni oluşturuyoruz.
    let grand_total = document.getElementsByClassName('grand-total')[0]//Genel toplam alanını alıyoruz.
    all_total_fields = document.getElementsByClassName('total-price')//Sepetteki tüm toplam fiyat alanlarını alıyoruz.
    for(let i = 0; i < all_total_fields.length; i++){//Tüm toplam fiyat alanlarını tek tek dolaşıyoruz.
    all_prices = Number(all_total_fields[i].innerText.replace('$', ''))//Her toplam fiyatı dolarsız ve sayıya dönüştürerek alıyoruz.
    total+=all_prices//Her toplam fiyatı genel toplam fiyatına ekliyoruz.
    }
   
    grand_total.children[0].innerText = "$"+total//Genel toplam fiyatını güncelliyoruz.
    grand_total.children[0].style.fontWeight = 'bold'//Genel toplam fiyatının yazı stilini kalın yapıyoruz.
    console.log(total)//Genel toplam fiyatını konsola yazdırıyoruz.
    
}




//Bu fonksiyon, bir ürünü sepetten kaldırmak için.
function removeItem(event){
    del_btn = event.target//Tıklanan kaldırma düğmesini del_btn değişkenine atıyoruz.
    del_btn_parent = del_btn.parentElement.parentElement//Kaldırma düğmesinin bulunduğu satırı alıyoruz.
    del_btn_parent.remove()//Bu satırı (yani ürünü) sepetten kaldırıyoruz.
    console.log(del_btn)//Kaldırılan düğmeyi konsola yazdırıyoruz.
    grandTotal()//Genel toplamı güncellemek için grandTotal fonksiyonunu çağırıyoruz.

    }
    /*function setPrice(paymentType) {
        let grandTotal = document.getElementsByClassName('grand-total')[0];
        let totalText = grandTotal.children[0].innerText.replace('$', '');
        let total = parseFloat(totalText);
    
        if (paymentType === 'cash') {
          total *= 0.90; // %10 indirim
        } else if (paymentType === 'creditCard') {
          total *= 0.95; // %5 indirim
        } 
    
        grandTotal.children[0].innerText = "$" + total.toFixed(2);
        grandTotal.children[0].style.fontWeight = 'bold';
      }*/
    
     /* function setPrice(paymentType) {
        let grandTotal = document.getElementsByClassName('grand-total')[0]; //ifadesi, class adı "grand-total" olan HTML elemanını seçer.
        let totalText = grandTotal.children[0].innerText.replace('$', ''); //ifadesi, bu elemanın içindeki yazıyı alır ve dolar işaretini ($) kaldırır.
        let total = parseFloat(totalText);// ifadesi, bu yazıyı ondalık bir sayıya çevirir.
    
        switch (paymentType) {//değişkeninin değerine göre hangi kod bloğunun çalışacağını belirler.
            case 'cash':
                total *= 0.90; // %10 indirim
                break;
            case 'creditCard':
                total *= 0.95; // %5 indirim
                break;
            default:
                break;
        }
    
        grandTotal.children[0].innerText = "$" + total.toFixed(2);//ifadesi, indirimi uygulanmış toplam tutarı iki ondalık basamak ile $ işareti ekleyerek günceller.
        grandTotal.children[0].style.fontWeight = 'bold';//ifadesi, toplam tutarın görünümünü kalın yapar.
    } */ 
    function setPrice(paymentType) {
        // class adı 'grand-total' olan HTML elemanını seçiyoruz.
        let grandTotal = document.getElementsByClassName('grand-total')[0];
    
        // Bu elemanın içindeki yazıyı alıyoruz ve dolar işaretini ($) kaldırıyoruz.
        let totalText = grandTotal.children[0].innerText.replace('$', '');
    
        // Bu yazıyı ondalık bir sayıya çeviriyoruz.
        let total = parseFloat(totalText);
    
        // paymentType değişkenine göre indirim uyguluyoruz.
        // Eğer 'cash' ise %10 indirim (0.90 çarpanı),
        // Eğer 'creditCard' ise %5 indirim (0.95 çarpanı),
        // Diğer durumlarda indirim uygulanmaz (1 çarpanı).
        total *= paymentType === 'cash' ? 0.90 : (paymentType === 'creditCard' ? 0.95 : 1);
    
        // İndirimi uygulanmış toplam tutarı iki ondalık basamak ile $ işareti ekleyerek güncelliyoruz.
        grandTotal.children[0].innerText = "$" + total.toFixed(2);
    
        // Toplam tutarın görünümünü kalın yapıyoruz.
        grandTotal.children[0].style.fontWeight = 'bold';
    }



   
      
      
  