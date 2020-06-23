const Tour = require('../models/tours.model');

exports.getHome = async (req,res,next) => {
    const tours = await Tour.find().limit(3);
    res.render('index', { 
       title: 'The Asian Tour',
       tours,
    });
}

exports.getAbout = async (req,res,next) => {
    res.render('about', { 
       title: 'The Asian Tour',
    });
}

exports.getTours = async (req,res,next) => {
    const tours = await Tour.find();
    res.render('tours', { 
       title: 'The Asian Tour',
       tours
    });
}