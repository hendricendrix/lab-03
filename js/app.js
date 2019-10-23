'use strict';

function MyImagesObj(img) {
  this.title = img.title;
  this.image_url = img.image_url;
  this.description = img.description;
  this.keyword = img.keyword;
  this.horns = img.horns;
}

MyImagesObj.myImages =[];


MyImagesObj.prototype.render = function() {
  $('main').append('<div class="clone"></div>');
  let imgClone = $('div[class="clone"]');
  
  let imgHtml = $('#photo-template').html();
  
  imgClone.html(imgHtml);
  
  imgClone.find('h2').text(this.title);
  imgClone.find('img').attr('src', this.image_url);
  imgClone.find('img').attr('alt', this.description);
  imgClone.find('p').text(this.description);
  imgClone.removeClass('clone');
  imgClone.attr('class', this.title);
};

MyImagesObj.readJson = () => {
  $.get('data/page-1.json', 'json')
    .then(data => {
      data.forEach(item => {
        MyImagesObj.myImages.push(new MyImagesObj(item));
      });
    })
    .then(MyImagesObj.loadimages);
};

MyImagesObj.loadimages = () => {
  MyImagesObj.myImages.forEach(img => img.render());
};
  
$(() => MyImagesObj.readJson());

