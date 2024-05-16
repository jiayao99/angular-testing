import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';
import { CharacterService } from './character.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Character } from './character.model';

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    let mockCharacters: Character[] = [
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

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AppComponent],
            imports: [HttpClientTestingModule],
            providers: [
                [CharacterService]
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        component.characters = mockCharacters;
        fixture.detectChanges();
    });

    it('should render the title', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector('h1')?.textContent).toContain('Characters');
    });

    it('shows fields for name and culture', () => {
        const characterElements = fixture.debugElement.queryAll(By.css('.charname, .culture'));
        expect(characterElements[0].nativeElement.textContent).toContain('Gavin');
        expect(characterElements[1].nativeElement.textContent).toContain('North');
        expect(characterElements[2].nativeElement.textContent).toContain('');
        expect(characterElements[3].nativeElement.textContent).toContain('South');
    });

    it('shows how many books this characters made an appearance in', () => {
        const bookElements = fixture.debugElement.queryAll(By.css('.booksno'));
        expect(bookElements.length).toEqual(mockCharacters.length);
        bookElements.forEach((element, index) => {
            const expectedBookCount = `${mockCharacters[index].books.length}`;
            expect(element.nativeElement.textContent).toContain(expectedBookCount);

        });
    });


    it('shows alias if no name present', () => {
        const nameElements = fixture.debugElement.queryAll(By.css('.charname'));
        expect(nameElements[2].nativeElement.textContent).toContain('Farmer');

    })
});
