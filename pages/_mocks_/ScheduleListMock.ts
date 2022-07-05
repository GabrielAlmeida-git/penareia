export const ScheduleListMock = 
{
  local: '',
  quadra: [1, 2, 3],
  data: [{data: '', horarios: [{horario: '07:00 às 08:00', livre: true, tipo: 'normal', select: false},
  {horario: '08:00 às 09:00', livre: true, tipo: 'nobre', select: false},
  {horario: '09:00 às 10:00', livre: false, tipo: 'nobre', select: false},
  {horario: '10:00 às 11:00', livre: false, tipo: 'nobre', select: false},
  {horario: '11:00 às 12:00', livre: true, tipo: 'normal', select: false},
  {horario: '12:00 às 13:00', livre: true, tipo: 'normal', select: false}]}],
  horarios: [
    {horario: '07:00 às 08:00', livre: true, tipo: 'normal', select: false},
    {horario: '08:00 às 09:00', livre: true, tipo: 'nobre', select: false},
    {horario: '09:00 às 10:00', livre: false, tipo: 'nobre', select: false},
    {horario: '10:00 às 11:00', livre: false, tipo: 'nobre', select: false},
    {horario: '11:00 às 12:00', livre: true, tipo: 'normal', select: false},
    {horario: '12:00 às 13:00', livre: true, tipo: 'normal', select: false}
  ]
}

export const correctMock = {
  'Astral': {
    1: {
      '12-12-2012': {
        '08 às 09': {
          'reservado': true,
          'select': false
        }
      }     
    },
    2: {},
    3: {}
  }, 
  'RGR': {
    1: {
      '12-12-2012': {
        '08 às 09': {
          reservado: true,
          select: false
        }
      }     
    },
    2: {},
    3: {}
  }
}


export const MockZada = {
  Astral: [
    1,
    2,
    3
  ]
}

