export interface configTable {
  key: string,
  name: string,
  type?: string
} 

export interface Paginator {
  length: number,
  pageIndex: number,
  pageSize: number
}; 

export const tableComics: configTable[] = [
  {
    key: 'image',
    name: 'Miniatura',
    type: 'image'
  },
  {
    key: 'title',
    name: 'Titulo'
  },
  {
    key: 'onsaleDate',
    name: 'Fecha de Venta',
    type: 'date'
  },
  {
    key: 'description',
    name: 'Descripción'
  },
  {
    key: 'upc',
    name: 'UPC'
  },
  {
    key: 'modified',
    name: 'Fecha de Modificación',
    type: 'date'
  },
  {
    key: 'printPrice',
    name: 'Precio de impresión',
    type: 'currency'
  },
  {
    key: 'creators',
    name: 'Creadores',
    type: 'chip'
  },
  {
    key: 'characters',
    name: 'Personajes',
    type: 'chip'
  }
]