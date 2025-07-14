import React from 'react';
import { useSelector } from 'react-redux';
import SectionContainer from '../shared/SectionContainer';
import ChaletCard from './ChaletCard';
import { HOME_CONTENT } from '../../utils/constants';
import type { RootState } from '../../../../store';
import type { Chalet } from '../../types';

const FeaturedChaletsSection: React.FC = () => {
  const { title, subtitle } = HOME_CONTENT.featuredChalets;
  const chalets = useSelector((state: RootState) => state.home.featuredChalets);

  return (
    <SectionContainer title={title} subtitle={subtitle}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {chalets.map((chalet: Chalet) => (
          <ChaletCard
            key={chalet.id}
            {...chalet}
          />
        ))}
      </div>
    </SectionContainer>
  );
};

export default FeaturedChaletsSection; 