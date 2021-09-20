import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './guards/auth.guard';
import { TokenInterceptor } from './interceptors/token.interceptor';

@NgModule({
  // declarations: [],
  // imports: [HttpClientModule, CommonModule],
  // providers: [
  //   AuthGuard,
  //   {
  //     provide: HTTP_INTERCEPTORS,
  //     useClass: TokenInterceptor,
  //     multi: true,
  //   },
  // ],

  declarations: [],
})
export class CoreModule {
  // constructor(@Optional() @SkipSelf() core: CoreModule) {
  //   if (core) {
  //     throw new Error('You should import core module only in the root module');
  //   }
  // }
}
