var obj_util = {};

obj_util.getImgUriByProduct = (product) => {
    if (!product) return '';
    if (product.image) return 'assets/images/' + product.image;
    return 'assets/images/' + product.id + '_thumb.png';
};
