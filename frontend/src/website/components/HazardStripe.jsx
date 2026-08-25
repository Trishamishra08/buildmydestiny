import React from 'react';

const HazardStripe = ({ className = 'h-3', thin = false }) => (
  <div className={`${thin ? 'bmd-hazard-thin' : 'bmd-hazard'} w-full ${className}`} aria-hidden="true" />
);

export default HazardStripe;
