import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { PlayerService } from './src/app/player.service';
import { Player } from './src/app/player';

describe('PlayerService', () => {
  let service: PlayerService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PlayerService]
    });
    service = TestBed.inject(PlayerService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getPlayers', () => {
    it('should return an Observable<Player[]>', () => {
      const players: Player[] = [
          { _id: '1', firstname: 'David', lastname: 'Rams', touchdowns: '23', rushingyards: '2760' },
          { _id: '1', firstname: 'Sam', lastname: 'Travis', touchdowns: '0', rushingyards: '456' }
      ];

      service.getPlayers().subscribe(res => {
        expect(res.length).toBe(2);
        expect(res).toEqual(players);
      });

      const req = httpMock.expectOne('http://localhost:5000/api/players');
      expect(req.request.method).toBe('GET');
      req.flush(players);
    });
  });

  describe('getPlayer', () => {
    it('should return an Observable<Player>', () => {
        const player: Player = { _id: '1', firstname: 'David', lastname: 'Rams', touchdowns: '23', rushingyards: '2760' };

      service.getPlayer(player._id).subscribe(res => {
        expect(res).toEqual(player);
      });

      const req = httpMock.expectOne(`http://localhost:5000/api/players/${player._id}`);
      expect(req.request.method).toBe('GET');
      req.flush(player);
    });
  });

  describe('addPlayer', () => {
    it('add a player and return', () => {
        const player: Player = { firstname: 'David', lastname: 'Rams', touchdowns: '23', rushingyards: '2760' };

      service.addPlayer(player).subscribe(res => {
        expect(res).toEqual(player);
      });

      const req = httpMock.expectOne('http://localhost:5000/api/players');
      expect(req.request.method).toBe('POST');
      req.flush(player);
    });
  });

  describe('updatePlayer', () => {
    it('update a player and return', () => {
        const player: Player = { _id: '1', firstname: 'David', lastname: 'Rams', touchdowns: '23', rushingyards: '2760' };

      service.updatePlayer(player).subscribe(res => {
        expect(res).toEqual(player);
      });

      const req = httpMock.expectOne(`http://localhost:5000/api/players/${player._id}`);
      expect(req.request.method).toBe('PUT');
      req.flush(player);
    });
  });

  describe('deletePlayer', () => {
    it('should delete a player', () => {
        const player: Player = { _id: '1', firstname: 'David', lastname: 'Rams', touchdowns: '23', rushingyards: '2760' };

      service.deletePlayer(player._id).subscribe();

      const req = httpMock.expectOne(`http://localhost:5000/api/players/${player._id}`);
      expect(req.request.method).toBe('PUT');
      req.flush(player);
    });
  });
  });
