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
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductosDialogComponent } from '../productos-dialog/productos-dialog.component';
import { Producto } from 'src/app/models/producto';

@Component({
  selector: 'app-productosadd',
  templateUrl: './productosadd.component.html',
  styleUrls: ['./productosadd.component.css']
})
export class ProductosaddComponent implements OnInit {
  myimage: any;
  myimage1: string;
  form: FormGroup;
  idProducto: number=0;
  codigo:string;
  categorias :any;
  myimage11: any;
  //mostrar codigo
  creado:any

  //FOTO
  imagenLocal:any;
  imagenCon:any;
  visible:any;

  constructor(public dialog: MatDialog, private fb : FormBuilder,private Router: Router, private ProductoService:
    ProductoService, private CategoriaService:
    CategoriaService, private Route : ActivatedRoute, private toastr: ToastrService, public _location: Location,
    private PaginacionService: PaginacionService)
    {
      this.myimage= new Observable<any>();
      this.myimage1= String();
      this.codigo=String();
      this.imagenLocal="";
      this.visible=true;
      if(this.Route.snapshot.params.id>0){
        this.idProducto = this.Route.snapshot.params.id;
        this.form = this.fb.group({
          id: this.Route.snapshot.params.id,
          precioCompra: new FormControl('',[Validators.required, Validators.pattern("^[0-9]+([.][0-9]+)?$")]),
          precioVenta: new FormControl('',[Validators.required, Validators.pattern("^[0-9]+([.][0-9]+)?$")]),
          genero: new FormControl('',Validators.required),
          color: new FormControl('',Validators.required),
          talla: new FormControl('',[Validators.required, Validators.maxLength (5)]),
          marca: new FormControl(''),
          descripcion: new FormControl('',Validators.required),
          codigo: new FormControl(''),
          imagen: new FormControl(''),
          idCategoria: new FormControl('',Validators.required),
        })
      }
      else{
        this.form = this.fb.group({
          id: this.Route.snapshot.params.id,
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
          idCategoria: new FormControl('',Validators.required),
        })
      }
    }

  ngOnInit(): void {
    this.Categorias();
    if(this.Route.snapshot.params.id>0){
      this.ProductoService.get(this.Route.snapshot.params.id).subscribe(
        r=>{
          this.form.controls['precioCompra'].setValue(r.data.precioCompra)
          this.form.controls['precioVenta'].setValue(r.data.precioVenta)
          this.form.controls['genero'].setValue(r.data.genero)
          this.form.controls['color'].setValue(r.data.color)
          this.form.controls['talla'].setValue(r.data.talla)
          this.form.controls['marca'].setValue(r.data.marca)
          this.form.controls['descripcion'].setValue(r.data.descripcion)
          this.codigo=(r.data.codigo)
          this.myimage= this.toImage(r.data.imagen)
          this.imagenLocal=r.data.imagen
          this.visible=false;
          this.form.controls['idCategoria'].setValue(r.data.idCategoria)
        }
      )
    }
  }

  Guardar(tipo:any){
    if((this.form.value).imagen===""){
      (this.form.value).imagen=this.imagenLocal;
    }else{
        (this.form.value).imagen=this.imagenCon;
    }
    (this.form.value).codigo=this.codigo;

    if(this.Route.snapshot.params.id>0){
      console.log(this.form.value)
      this.ProductoService.update(this.form.value).subscribe
      (
        r=> {
          this.Router.navigate(['productos']);
          this.toastr.success("se edito exitosamente","Editado.")
        },
        error => {
          this.toastr.warning("no se edito","Error.")
        }
      )
    }
    else{
      this.ProductoService.save(this.form.value).subscribe
      (
        r=> {

          if(tipo===true){
              this.form.controls['precioCompra'].setValue(r.data.precioCompra)
              this.form.controls['precioVenta'].setValue(r.data.precioVenta)
              this.form.controls['genero'].setValue(r.data.genero)
              this.form.controls['color'].setValue("")
              this.form.controls['talla'].setValue("")
              this.form.controls['marca'].setValue(r.data.marca)
              this.form.controls['descripcion'].setValue(r.data.descripcion)
              this.form.controls['stock'].setValue("")
              this.form.controls['imagen'].setValue("")
              this.codigo=(r.data.codigo)
              this.myimage=""
              this.form.controls['idCategoria'].setValue(r.data.idCategoria)
              //mostrar codigo
              this.openDialog(r.data);
          }else if(tipo===false){

            this.form.controls['precioCompra'].setValue('')
            this.form.controls['precioVenta'].setValue('')
            this.form.controls['genero'].setValue('')
            this.form.controls['color'].setValue('')
            this.form.controls['talla'].setValue('')
            this.form.controls['marca'].setValue('')
            this.form.controls['descripcion'].setValue('')
            this.form.controls['stock'].setValue(0)
            this.form.controls['codigo'].setValue('')
            this.codigo=('')
            this.myimage=""
            this.form.controls['idCategoria'].setValue('')

            this.openDialog(r.data);
          }

          this.toastr.success("se guardo exitosamente","Guardado.")
        },
        error => {
          this.toastr.warning("no se guardo","Error.")
        }
      )
    }
  }

  Categorias()
  {
    this.PaginacionService.Filtro.PageNumber=1;
    this.PaginacionService.Filtro.filter='';
    this.PaginacionService.Filtro.PageSize=100000;
    this.CategoriaService.getCategorias().subscribe( r =>
      {
        this.categorias = r.data;
      }
    )
  }
  //evento que captura el archivo
  onChange($event: Event) {
    const file = ($event.target as HTMLInputElement).files![0];
    this.convertToBase64(file);
  }
  //metodo para convertir la img a base 64
  convertToBase64(file: File) {
    this.myimage = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
    });
    this.myimage.subscribe((d: any)=>{
      this.imagenCon=d;
    })
  }
  //metodo para lecturar el archivo
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
  //base 64 to image
  async toImage(url: any){
    if(url===""){
      return '/assets/img/productoSinImagen.jpg'
    }
    var res =  await fetch(url);
    var blob =  (await res).blob();

    const result =  new Promise(async (resolve, reject) => {
      var reader = new FileReader();
      reader.addEventListener("load", function () {
        resolve(reader.result);
      }, false);

      reader.onerror = () => {
        return reject(this);
      };
      reader.readAsDataURL(await blob);
    })
    return result
  };


  //mostrarCodigoGenerado
  openDialog(creado:any) {
    this.dialog.open(ProductosDialogComponent, {
      data: {
        creado:creado,
      },
    });
  }
}
