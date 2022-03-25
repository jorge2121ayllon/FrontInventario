export class DetalleCompra{
  id?: number;
  cantidad?: number;
  subTotal?: number;
  idProducto? : number;
  idCompra? : number;

  //estos dos auxiliares para la vista
  producto? : string;
  precioCompra?: number;
}
