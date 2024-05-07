import { Button } from '@chakra-ui/react'
import React from 'react'

const Pagination = ({page}) => {
  return (
    <div>
        <Button>Prev</Button>
         <span> {page} </span>
        <Button>Next</Button>

    </div>
  )
}

export default Pagination