const mongoose=require('mongoose')
const cities=require('./cities')
const {places,descriptors}=require('./seedHelper');
const Tutor=require('../models/tutor');

main().catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/TutorMate');
}

const sample = array => array[Math.floor(Math.random() * array.length)];
const seedDB = async () => {
    await Tutor.deleteMany({});
    for (let i = 0; i < 50; i++) {
        // const random1000 = Math.floor(Math.random() * 1000);
        // const price = Math.floor(Math.random() * 20) + 10;
        // const camp = new Campground({
        //     location: `${cities[random1000].city}, ${cities[random1000].state}`,
        //     title: `${sample(descriptors)} ${sample(places)}`,
        //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
        //     price: Math.floor(Math.random()*100)+1,
        //     author: '64565ec373eb12bb40d215af',
        //     images: [
        //         {
        //             url: 'https://res.cloudinary.com/douqbebwk/image/upload/v1600060601/YelpCamp/ahfnenvca4tha00h2ubt.png',
        //             filename: 'YelpCamp/ahfnenvca4tha00h2ubt'
        //         },
        //         {
        //             url: 'https://res.cloudinary.com/douqbebwk/image/upload/v1600060601/YelpCamp/ruyoaxgf72nzpi4y6cdi.png',
        //             filename: 'YelpCamp/ruyoaxgf72nzpi4y6cdi'
        //         }
        //     ]
        // })
        const newTutor=new Tutor({
            title: 'Bishal Kundu',
            subjects: ['Computer Science', 'Maths', 'Physics'],
            price: 1000,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            address: '13H Barodasarani, Kol-82',
            city: 'Kolkata',
            country: 'India',
            author: '6460b601f9ffeaad05f47bb0'
        })
        await newTutor.save();
    }
}
seedDB().then(() => {
    mongoose.connection.close();
})
