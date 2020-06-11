import React from 'react'

import CardContainer from '../card-container'
import './cards-wrapper.css'
import CardBody from '../card-body'

export default function CardList (props) {
  const { cardsPromos } = props
  return (

    <div className='row'>
      {
        cardsPromos.map((cardPromo, index) => {
          const titleData = {
            title: cardPromo.prize,
            titleData: cardPromo.data
          }
          const promoData = {
            productQuantity: cardPromo.productInfo.length,
            startDate: cardPromo.promoStarts,
            endDate: cardPromo.promoEnds
          }
          const graphData = {}

          return (
            <div className='col-12 col-md-4 card-List-element' key={index}>
              <CardContainer id={cardPromo.id}>
                <CardBody
                  titleData={titleData}
                  promoData={promoData}
                  graphData={graphData}
                />
              </CardContainer>
            </div>
          )
        })
      }
    </div>
  )
}
