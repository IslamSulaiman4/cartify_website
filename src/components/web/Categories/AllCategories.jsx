import React, { useContext } from 'react'
import { UserContext } from '../Context/User.jsx';
import { useQuery } from 'react-query';
import { Navigation, Pagination, Autoplay} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/bundle';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import axios from 'axios';
import { Link } from 'react-router-dom';
export default function AllCategories() {
    const {userToken} =useContext(UserContext);

    const getAllCatigories= async ()=>{
        const token=localStorage.getItem('userToken');

        const {data}= await axios.get(`${import.meta.env.VITE_API_URL}/products/categories`);    
        return data;
      }
      const {data,isLoading} =useQuery('get all categories',getAllCatigories)
      
  return (
    <div className='container pt-5 '>
    <div className='swiper-custom-pagination '></div>
        <Swiper
        modules={[Navigation, Pagination,Autoplay]}
        spaceBetween={60}
        slidesPerView={3.7}
        navigation
        loop={true}
        autoplay={{
          delay: 1000,
        }}
        pagination={{ 
          clickable: true,
        el:'.swiper-custom-pagination' }}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log('swiper')}
      >
    
     {data?data ?.map( (category)=>
      <SwiperSlide key={category.id}>
    
    <Link to={`/products/category/${category}`}>
    <div className="category">
      <p>{category}</p>
      </div>  
    </Link>
    
      </SwiperSlide>   
       ):<p>No Categories Found</p>}
    
    
        </Swiper></div>
  )
}
