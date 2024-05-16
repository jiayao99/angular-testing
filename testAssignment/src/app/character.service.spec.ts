import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CharacterService } from './character.service';
import { Character } from './character.model';

describe('CharacterService', () => {
    let service: CharacterService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [CharacterService]
        });
        service = TestBed.inject(CharacterService);
        httpMock = TestBed.inject(HttpTestingController);
    });


    it('should fetch characters correctly', () => {
        const mockCharacters: Character[] = [
            {
                name: 'Gavin', aliases: ['G'], culture: 'North', books: ['1', '2', '3'],
                url: '',
                gender: '',
                born: '',
                died: '',
                titles: [],
                father: '',
                mother: '',
                spouse: '',
                allegiances: [],
                povBooks: [],
                tvSeries: [],
                playedBy: []
            },
            {
                name: '', aliases: ['Farmer'], culture: 'South', books: ['1', '2'],
                url: '',
                gender: '',
                born: '',
                died: '',
                titles: [],
                father: '',
                mother: '',
                spouse: '',
                allegiances: [],
                povBooks: [],
                tvSeries: [],
                playedBy: []
            }
        ];

        service.getCharacters(1).subscribe(characters => {
            expect(characters.length).toBe(2);
            expect(characters).toEqual(mockCharacters);
        });

        const req = httpMock.expectOne('https://www.anapioficeandfire.com/api/characters?page=1&pageSize=10');
        expect(req.request.method).toBe('GET');
        req.flush(mockCharacters);
    });

});
