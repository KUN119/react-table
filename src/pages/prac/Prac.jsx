import { useMemo, useState } from 'react'
import Table from '../../components/table/Table'
import { createColumnHelper } from '@tanstack/react-table'
import { RiDeleteBinLine } from 'react-icons/ri'
import Checkbox from '../../components/table/Checkbox/Checkbox'

const MOCK_DATA = [
  {
    checkbox: '',
    number: 1,
    placeName: '완제품 출하 창고',
    icon: <RiDeleteBinLine />
  },
  {
    checkbox: '',
    number: 10,
    placeName: '보라돌이 전용 장소',
    icon: <RiDeleteBinLine />
  },
  {
    checkbox: '',
    number: 3,
    placeName: '홀드를 닦는 곳',
    icon: <RiDeleteBinLine />
  },
  {
    checkbox: '',
    number: 4,
    placeName: '클라이밍 창고',
    icon: <RiDeleteBinLine />
  },
  {
    checkbox: '',
    number: 5,
    placeName: '아무거나 월드',
    icon: <RiDeleteBinLine />
  },
  {
    checkbox: '',
    number: 9,
    placeName: '아무고토 몰라요',
    icon: <RiDeleteBinLine />
  },
  {
    checkbox: '',
    number: 7,
    placeName: '지는거에요? 이겨',
    icon: <RiDeleteBinLine />
  }
]

export default function Prac() {
  const [rowSelection, setRowSelection] = useState({})
  const [data, setData] = useState(MOCK_DATA)

  const columnHelper = createColumnHelper()
  //! accessor()의 첫 인자를 data의 key값과 맞춰줘야함
  //! header:를 사용하지 않으면 자동으로 accessor()의 첫 인자가 헤더에 출력 들어감
  const columns = useMemo(() => {
    return [
      columnHelper.accessor('checkbox', {
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllRowsSelected()}
            indeterminate={table.getIsSomeRowsSelected()} //^ 체크박스 선택/해제 할 때 마다 실행되는 함수
            onChange={table.getToggleAllRowsSelectedHandler()} //or getToggleAllPageRowsSelectedHandler
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            disabled={!row.getCanSelect()}
            onChange={row.getToggleSelectedHandler()}
          />
        )
      }),
      columnHelper.accessor('number', {
        header: () => 'NO',
        cell: info => info.getValue()
      }),
      columnHelper.accessor('placeName', {
        header: () => '구역명',
        cell: info => info.getValue()
      }),
      columnHelper.accessor('icon', {
        header: () => '',
        cell: info => info.getValue()
      })
    ]
  }, [columnHelper])

  return (
    <>
      <Table
        data={data}
        columns={columns}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
      />
    </>
  )
}
