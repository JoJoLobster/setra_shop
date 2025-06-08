function getImgUriByProduct(product) {
  if(product){
    if(product.image) {
      return 'assets/images/' + product.image;
    } else {
      return 'assets/images/' + product.id + '_thumb.png';
    }

  } 
  
  return 'assets/images/' + product.image;

}
