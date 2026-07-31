import React from 'react';
import Slider from 'react-slick';
import SectionContainer from '../shared/SectionContainer';
import ReviewCard from './ReviewCard';
import { HOME_CONTENT } from '../../utils/constants';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useTranslation } from 'react-i18next';

const ReviewsSection: React.FC = () => {
  const { t } = useTranslation('home');
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    rtl: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <div className="bg-gray-50 py-12">
      <SectionContainer
        title={t('reviews.title')}
        subtitle={t('reviews.subtitle')}
      >
        <div className="px-4">
          <Slider {...settings}>
            {HOME_CONTENT.reviews.testimonials.map((review) => (
              <div key={review.id} className="px-3">
                <ReviewCard {...review} />
              </div>
            ))}
          </Slider>
        </div>
      </SectionContainer>
    </div>
  );
};

export default ReviewsSection; 