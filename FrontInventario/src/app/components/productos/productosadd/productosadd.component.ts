import { environment } from 'src/environments/environment';
import { PaginacionService } from 'src/app/services/paginacion.service';
import { ToastrService } from 'ngx-toastr';
import { ProductoService } from 'src/app/services/producto.service';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { asNativeElements, Component, ElementRef, OnInit, ViewChild,Inject } from '@angular/core';
import { observable, Observable, Observer, Subscriber } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import * as _ from 'lodash';
import { Location } from '@angular/common';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductosDialogComponent } from '../productos-dialog/productos-dialog.component';
import { ProductosComponent } from '../productos/productos.component';

@Component({
  selector: 'app-productosadd',
  templateUrl: './productosadd.component.html',
  styleUrls: ['./productosadd.component.css']
})
export class ProductosaddComponent implements OnInit {

  load: boolean= false;
  myimage: any;
  myimage1: string;
  form: FormGroup;
  idProducto: number=0;
  codigo:string;
  categorias :any;
  myimage11: any;
  //mostrar codigo
  creado:any
  ImagenCreada!:File;
  envairomentGloblal= environment.appUrl;
  //FOTO
  visible:any;
  imagenContador= 0;

  //
  checkCodigo = new FormControl(false);

  constructor(public dialog: MatDialog, private fb : FormBuilder,private Router: Router, private ProductoService:
    ProductoService, private CategoriaService:
    CategoriaService, private Route : ActivatedRoute, private toastr: ToastrService, public _location: Location,
    private PaginacionService: PaginacionService , public dialogRef: MatDialogRef<ProductosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any)
    {
      this.myimage= new Observable<any>();
      this.myimage1= String();
      this.codigo=String();

      this.visible=true;
      if(this.data.id>0){
        this.imagenContador=1;
        this.idProducto = this.data.id;
        this.form = this.fb.group({
          id: this.data.id,
          precioCompra: new FormControl('',[Validators.required, Validators.pattern("^[0-9]+([.][0-9]+)?$")]),
          precioVenta: new FormControl('',[Validators.required, Validators.pattern("^[0-9]+([.][0-9]+)?$")]),
          stock: new FormControl('',[Validators.required, Validators.pattern("^[0-9]+([.][0-9]+)?$")]),
          genero: new FormControl('',Validators.required),
          color: new FormControl('',Validators.required),
          talla: new FormControl('',[Validators.required, Validators.maxLength (5)]),
          marca: new FormControl(''),
          descripcion: new FormControl('',Validators.required),
          codigo: new FormControl(''),
          imagen: new FormControl(''),
          imagenguardar : new FormControl(''),
          idCategoria: new FormControl('',Validators.required),
        })
      }
      else{
        this.form = this.fb.group({
          id: this.data.id,
          precioCompra: new FormControl('',[Validators.required, Validators.pattern("^[0-9]+([.][0-9]+)?$")]),
          precioVenta: new FormControl('',[Validators.required, Validators.pattern("^[0-9]+([.][0-9]+)?$")]),
          genero: new FormControl('',Validators.required),
          color: new FormControl('',Validators.required),
          talla: new FormControl('',[Validators.required, Validators.maxLength (5)]),
          marca: new FormControl(''),
          descripcion: new FormControl('',Validators.required),
          stock: new FormControl(0),
          codigo: new FormControl(''),
          imagen: new FormControl(''),
          imagenguardar : new FormControl(''),
          idCategoria: new FormControl('',Validators.required),
        })
      }
    }

  ngOnInit(): void {
    this.load= false;
    this.Categorias();
    if(this.data.id>0){
      this.ProductoService.get(this.data.id).subscribe(
        r=>{
          this.form.controls['precioCompra'].setValue(r.data.precioCompra)
          this.form.controls['precioVenta'].setValue(r.data.precioVenta)
          this.form.controls['genero'].setValue(r.data.genero)
          this.form.controls['color'].setValue(r.data.color)
          this.form.controls['talla'].setValue(r.data.talla)
          this.form.controls['marca'].setValue(r.data.marca)
          this.form.controls['stock'].setValue(r.data.stock)
          this.form.controls['codigo'].setValue(r.data.codigo)
          this.myimage=r.data.imagen;
          this.form.controls['descripcion'].setValue(r.data.descripcion)


          this.visible=false;
          this.form.controls['idCategoria'].setValue(r.data.idCategoria)

          this.load=true;
        },
        error => {
          this.toastr.warning("Porfavor verifique su conexion a internet.")
          this.load=true;
        }
      )
    }
    else{
      this.load=true;
    }

  }

  Guardar(tipo:any){
    this.load= false;
    if(this.form.valid){
            if(this.data.id>0){
              if(this.form.value.imagen==="")
              {
                    this.form.value.imagen=this.myimage;
                    this.Update()
              }
              else
              {
                this.ProductoService.saveImagen(this.ImagenCreada).subscribe
                    (
                      res=> {
                          this.form.value.imagen=res.data;
                          this.Update()
                        }
                    )
              }
            }
            else{
              if(this.form.value.imagen==="")
              {
                    this.form.value.imagen="StaticFiles/images/productoSinImagen.jpg";
                    this.Save(tipo)
              }
              else
              {
                this.ProductoService.saveImagen(this.ImagenCreada).subscribe
                    (
                      res=> {
                          this.form.value.imagen=res.data;
                          this.Save(tipo)
                        },
                        error => {
                          this.load=true;
                          this.toastr.warning("revise la conexion a internet","No se pudo guardar.")
                      }
                    )
              }
            }
    }
    else
    {
      this.load= true;
    }
  }

  Categorias()
  {
    this.CategoriaService.getCategoriasProducto().subscribe( r =>
      {
        this.categorias = r.data;
      }
    )
  }

  //evento que captura el archivo
  onChange($event: Event) {
    this.imagenContador=0;
    const file = ($event.target as HTMLInputElement).files![0];
    this.ImagenCreada=file;
    this.convertToBase64(file);
  }

  convertToBase64(file: File) {
    this.myimage = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
    });

  }

  readFile(file: File, subscriber: Subscriber<any>) {
    const filereader = new FileReader();
    filereader.readAsDataURL(file);

    filereader.onload = () => {
      subscriber.next(filereader.result);
      subscriber.complete();
    };
    filereader.onerror = (error) => {
      subscriber.error(error);
      subscriber.complete();
    };
  }

  //mostrarCodigoGenerado
  openDialog(creado:any) {
    this.dialog.open(ProductosDialogComponent, {
      data: {
        creado:creado,
      },
    });
  }

  Update()
  {
    this.ProductoService.update(this.form.value).subscribe
    (
      r=> {
        this.load=true;
        this.openDialog(this.form.value);
        //this.Router.navigate(['productos']);
        this.toastr.success("se edito exitosamente","Editado.")

      },
      error => {
        this.load=true;
        this.toastr.warning("no se edito","Error.")
      }
    )
  }

  Save(tipo:any)
  {
      this.ProductoService.save(this.form.value).subscribe(
              r=>{
                            this.form.value.imagen=""
                            if(tipo===true){
                              console.log("entro tue")
                              this.form.controls['imagen'].setValue('')
                              this.form.controls['precioCompra'].setValue(r.data.precioCompra)
                              this.form.controls['precioVenta'].setValue(r.data.precioVenta)
                              this.form.controls['genero'].setValue(r.data.genero)
                              this.form.controls['color'].setValue("")
                              this.form.controls['talla'].setValue("")
                              this.form.controls['stock'].setValue("")
                              this.form.controls['marca'].setValue(r.data.marca)
                              this.form.controls['descripcion'].setValue(r.data.descripcion)
                              this.form.controls['stock'].setValue(0)
                              this.form.controls['imagen'].setValue("")
                              this.form.controls['codigo'].setValue(r.data.codigo)
                              this.codigo=(r.data.codigo)
                              this.myimage=""
                              this.form.controls['idCategoria'].setValue(r.data.idCategoria)
                              this.load= true;
                              //mostrar codigo
                              this.openDialog(r.data);
                            }else if(tipo===false){

                            this.form.controls['precioCompra'].setValue('')
                            this.form.controls['imagen'].setValue('')
                            this.form.controls['precioVenta'].setValue('')
                            this.form.controls['genero'].setValue('')
                            this.form.controls['color'].setValue('')
                            this.form.controls['talla'].setValue('')
                            this.form.controls['marca'].setValue('')
                            this.form.controls['descripcion'].setValue('')
                            this.form.controls['stock'].setValue(0)
                            this.form.controls['codigo'].setValue('')
                            this.codigo=this.form.value.codigo;
                            this.myimage=""
                            this.form.controls['idCategoria'].setValue('')
                            this.load= true;
                            this.dialogRef.close();
                            this.openDialog(r.data);
                          }
                          this.toastr.success("se guardo exitosamente","Guardado.")
              },
              error => {
                          this.load=true;
                          this.toastr.warning("revise la conexion a internet","Error.")
              }
            )
  }
  Limpiador()
  {
    if(this.checkCodigo.value==false)
    {
      this.form.value.codigo='';
    }
  }
}
