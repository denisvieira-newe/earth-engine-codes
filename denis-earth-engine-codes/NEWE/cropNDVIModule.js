exports.ndvi_l5_7 = function(image){
  return image.normalizedDifference(['B4', 'B3']).rename('NDVI');
};

exports.ndvi_l8 = function(image){
  return image.normalizedDifference(['B5', 'B4']).rename('NDVI');
};
    
exports.ndvi_l8_l9 = function(image){
  return image.normalizedDifference(['SR_B5', 'SR_B4']).rename('NDVI');
};
    
exports.ndvi_s2 = function(image){
  return image.normalizedDifference(['B8A', 'B4']).rename('NDVI');
};
   
exports.crop_mask = function(image, year){
  var band = 'classification_'+ee.Algorithms.String(year).getInfo();
    
  var crop_mask = ee.Image("projects/mapbiomas-workspace/public/collection5/mapbiomas_collection50_integration_v1")
                    .select(ee.String(band)).eq(39)
                    .add(ee.Image("projects/mapbiomas-workspace/public/collection5/mapbiomas_collection50_integration_v1")
                    .select(ee.String(band)).eq(41));
  
  var crop_area = crop_mask.gt(0);
  
  return image.updateMask(crop_area);
};
    