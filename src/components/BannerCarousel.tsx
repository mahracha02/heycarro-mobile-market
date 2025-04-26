
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { banners } from '@/data/sampleData';

const BannerCarousel = () => {
  const navigate = useNavigate();

  return (
    <Carousel className="w-full">
      <CarouselContent>
        {banners.map((banner) => (
          <CarouselItem key={banner.id}>
            <div 
              className="relative h-40 rounded-lg overflow-hidden cursor-pointer"
              onClick={() => navigate(banner.link)}
            >
              <img
                src={`https://source.unsplash.com/${banner.image}`}
                alt={banner.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                <h3 className="text-white font-bold text-xl">{banner.title}</h3>
                <p className="text-white/90 text-sm">{banner.subtitle}</p>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-2" />
      <CarouselNext className="right-2" />
    </Carousel>
  );
};

export default BannerCarousel;
