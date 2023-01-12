import { useNotification } from '@/context/notification.context'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { deleteUser } from '@/redux/slices/user.slice'
import DeleteIcon from '@mui/icons-material/Delete'
import { Box, Button } from '@mui/material'
import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid'
import React from 'react'

export interface IUsers {
  id: string
  username: string
  password: string
}

const Users: React.FC<{}> = () => {
  const pageSize = 5
  const usersState = useAppSelector((state) => state.userReducer)
  const { getSuccess } = useNotification()

  const dispatch = useAppDispatch()

  const handleDeleteUser = (user: IUsers) => {
    dispatch(deleteUser({ id: user.id }))
    getSuccess('User deleted successfully')
  }

  const columns = [
    {
      field: 'id',
      headerName: 'Id',
      flex: 3,
      renderCell: (params: GridRenderCellParams) => <>{params.value}</>,
    },
    {
      field: 'username',
      headerName: 'Username',
      flex: 3,
      renderCell: (params: GridRenderCellParams) => <>{params.value}</>,
    },
    {
      field: 'actions',
      type: 'actions',
      sortable: false,
      headerName: '',
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        <>
          {
            <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => handleDeleteUser(params.row)}>
              Delete
            </Button>
          }
        </>
      ),
    },
  ]

  return (
    <Box sx={{ width: '50%', marginX: 'auto', marginY: 10 }}>
      <DataGrid
        rows={usersState}
        columns={columns}
        disableColumnSelector
        disableSelectionOnClick
        autoHeight
        pageSize={pageSize}
        rowsPerPageOptions={[pageSize]}
        getRowId={(row: any) => row.id}
      />
    </Box>
  )
}

export default Users
