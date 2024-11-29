import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toastrService = inject(ToastrService);

  return new Promise<boolean>((resolve) => {
    authService.isAdmin().subscribe({
      next: (isAdmin: boolean) => {
        if (isAdmin) {
          resolve(true); // Yetki varsa devam et
        } else {
          toastrService.error(
            'Bu sayfaya erişim yetkiniz yok',
            'Yetkisiz erişim'
          );
          router.navigateByUrl(state.url); // Geldiği URL'ye geri dön
          resolve(false);
        }
      },
      error: () => {
        toastrService.error('Yetki kontrolü sırasında bir hata oluştu', 'Hata');
        router.navigate(['/home']); // Hata varsa ana sayfaya yönlendir
        resolve(false);
      },
    });
  });
};
