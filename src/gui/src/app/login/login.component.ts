import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Component({
  selector: 'login',
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {

  model: any = {username: '', password: ''};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {
  }

  ngOnInit() {
    sessionStorage.setItem('token', '');
  }

  login() {
    let url = 'http://localhost:8082/login';
    this.http.post<Observable<boolean>>(url, {
      username: this.model.username,
      password: this.model.password
    }).subscribe(isValid => {
      if (isValid) {
        sessionStorage.setItem('token', btoa(this.model.username + ':' + this.model.password));
        this.router.navigate(['/home']);
      } else {
        alert("Nieprawidłowe dane logowania")
      }
    });
  }
}
