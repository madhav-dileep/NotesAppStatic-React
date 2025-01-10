import React from 'react'
import NotesIcon from '@mui/icons-material/Notes';

const Header = () => {
  return (
    <div className='container-fluid headerStyle text-white p-3  fw-bold d-flex justify-content-between align-items-center bg-dark'>
        <div className='d-flex'>
            <NotesIcon style={{fontSize:'2rem'}} className='me-2 '/>
            <div style={{fontSize:'2rem'}} className='text-capitalize'>Notes app</div>
        </div>
        <ul>

        </ul>

    </div>
  )
}

export default Header