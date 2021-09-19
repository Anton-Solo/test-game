$( document ).ready(function(){
   
    $('.tabs__item').on('click', function() {
        $('.cards').removeClass('_tab-default');
        if(!$(this).hasClass('active')) {
            $('.tabs__item').removeClass('active');
            $(this).addClass('active');
        }
    });

    $('.cards-item__buy a').on('click', function(e) {
        e.preventDefault();
        let num = +$(this).attr('data-items');
        let numCoins = +$(this).attr('data-coins');
        
        if(isNaN(numCoins)) {
            let crystalsTxt = $('._item-crystals .crystals-num');
            let crystals = crystalsTxt.text().replace(/\s+/g, '');
            let sum = num + +crystals; 
            let sumTxt = sum.toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ');
            crystalsTxt.text(sumTxt);
        }
        if(isNaN(num)) {
            let coinsTxt = $('._item-coins .coins-num');
            let coins = coinsTxt.text().replace(/\s+/g, '');
            let sum = numCoins + +coins; 
            let sumTxt = sum.toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ');
            coinsTxt.text(sumTxt);
        }
       
    });

});