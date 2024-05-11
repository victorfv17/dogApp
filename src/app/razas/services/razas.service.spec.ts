import { TestBed, getTestBed } from '@angular/core/testing';

import { RazasService } from './razas.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


describe('RazasService', () => {
  let service: RazasService;
  let injector: TestBed;
  let httpMock: HttpTestingController;


  const responseData = {
    message: {
      beagle: [],
      boxer: []
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RazasService]
    });

    injector = getTestBed();
    service = TestBed.inject(RazasService);
    httpMock = TestBed.inject(HttpTestingController);
  });



  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getRazas() should return data', () => {
    service.getRazas().subscribe((res) => {
      expect(res).toEqual(responseData);
    });

    const req = httpMock.expectOne({
      method: 'GET',
      url: `https://dog.ceo/api/breeds/list/all`,
    });
    expect(req.request.method).toBe('GET');
    req.flush(responseData);
  });


  it('getRaza() should return data', () => {
    const terminoBusqueda = 'beagle';
    service.getRaza(terminoBusqueda).subscribe((res) => {
      expect(res).toEqual(responseData);
    });

    const req = httpMock.expectOne({
      method: 'GET',
      url: `https://dog.ceo/api/breed/${terminoBusqueda}/images/random`,
    });
    expect(req.request.method).toBe('GET');
    req.flush(responseData);
  });
});
