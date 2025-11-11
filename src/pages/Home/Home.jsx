import React from 'react'
import Banner from './Banner'
import LatestVehicles from './LatestVehicles'
import AboutUs from './AboutUs'
import TopCategories from './TopCategories'
import ErrorPage from '../ErrorPage'

export default function Home() {
  return (
    <div>
      <Banner></Banner>
      <AboutUs></AboutUs>
      <LatestVehicles></LatestVehicles>
      <TopCategories></TopCategories>
    </div>
  )
}
