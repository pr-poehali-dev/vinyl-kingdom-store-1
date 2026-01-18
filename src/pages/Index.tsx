import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

interface Album {
  id: number;
  title: string;
  artist: string;
  year: number;
  genre: string;
  price: number;
  image: string;
  condition: string;
}

interface Staff {
  id: number;
  name: string;
  position: string;
  description: string;
}

const staff: Staff[] = [
  { id: 1, name: "Михаил Виниловский", position: "Главный специалист по винилу", description: "Собирает пластинки более 20 лет. Знает все о легендарных альбомах 70-80х и может часами рассказывать истории о каждой записи." },
  { id: 2, name: "Анна Мелодина", position: "Эксперт по оценке состояния", description: "Профессионально оценивает состояние винила по международной системе градации. Гарантирует подлинность и качество каждой пластинки." },
  { id: 3, name: "Дмитрий Звуков", position: "Консультант по жанрам", description: "Специалист по рок, соул и диско музыке. Поможет подобрать идеальные альбомы для вашей коллекции и расскажет о редких изданиях." },
];

const albums: Album[] = [
  { id: 1, title: "Dark Side of the Moon", artist: "Pink Floyd", year: 1973, genre: "Rock", price: 2500, image: "https://cdn.poehali.dev/projects/30fe9c76-ca6f-4041-a86b-32b1ad751e60/files/7657c786-959e-4706-97de-15026fdb801a.jpg", condition: "Mint" },
  { id: 2, title: "Rumours", artist: "Fleetwood Mac", year: 1977, genre: "Rock", price: 2200, image: "https://cdn.poehali.dev/projects/30fe9c76-ca6f-4041-a86b-32b1ad751e60/files/1d461d7d-93f5-4f3b-88d3-aeae6dafc9e6.jpg", condition: "VG+" },
  { id: 3, title: "Thriller", artist: "Michael Jackson", year: 1982, genre: "Pop", price: 1800, image: "https://cdn.poehali.dev/projects/30fe9c76-ca6f-4041-a86b-32b1ad751e60/files/7657c786-959e-4706-97de-15026fdb801a.jpg", condition: "Mint" },
  { id: 4, title: "The Wall", artist: "Pink Floyd", year: 1979, genre: "Rock", price: 3000, image: "https://cdn.poehali.dev/projects/30fe9c76-ca6f-4041-a86b-32b1ad751e60/files/1d461d7d-93f5-4f3b-88d3-aeae6dafc9e6.jpg", condition: "Mint" },
  { id: 5, title: "Abbey Road", artist: "The Beatles", year: 1969, genre: "Rock", price: 3500, image: "https://cdn.poehali.dev/projects/30fe9c76-ca6f-4041-a86b-32b1ad751e60/files/7657c786-959e-4706-97de-15026fdb801a.jpg", condition: "VG+" },
  { id: 6, title: "Led Zeppelin IV", artist: "Led Zeppelin", year: 1971, genre: "Rock", price: 2800, image: "https://cdn.poehali.dev/projects/30fe9c76-ca6f-4041-a86b-32b1ad751e60/files/1d461d7d-93f5-4f3b-88d3-aeae6dafc9e6.jpg", condition: "Mint" },
  { id: 7, title: "What's Going On", artist: "Marvin Gaye", year: 1971, genre: "Soul", price: 2000, image: "https://cdn.poehali.dev/projects/30fe9c76-ca6f-4041-a86b-32b1ad751e60/files/7657c786-959e-4706-97de-15026fdb801a.jpg", condition: "VG+" },
  { id: 8, title: "Saturday Night Fever", artist: "Bee Gees", year: 1977, genre: "Disco", price: 1500, image: "https://cdn.poehali.dev/projects/30fe9c76-ca6f-4041-a86b-32b1ad751e60/files/1d461d7d-93f5-4f3b-88d3-aeae6dafc9e6.jpg", condition: "VG" },
  { id: 9, title: "Innervisions", artist: "Stevie Wonder", year: 1973, genre: "Soul", price: 2100, image: "https://cdn.poehali.dev/projects/30fe9c76-ca6f-4041-a86b-32b1ad751e60/files/7657c786-959e-4706-97de-15026fdb801a.jpg", condition: "Mint" },
  { id: 10, title: "Hotel California", artist: "Eagles", year: 1976, genre: "Rock", price: 2300, image: "https://cdn.poehali.dev/projects/30fe9c76-ca6f-4041-a86b-32b1ad751e60/files/1d461d7d-93f5-4f3b-88d3-aeae6dafc9e6.jpg", condition: "VG+" },
];

function Index() {
  const [activeTab, setActiveTab] = useState('catalog');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedArtist, setSelectedArtist] = useState('all');
  const [cart, setCart] = useState<Album[]>([]);

  const genres = ['all', ...Array.from(new Set(albums.map(a => a.genre)))];
  const years = ['all', ...Array.from(new Set(albums.map(a => a.year.toString()))).sort()];
  const artists = ['all', ...Array.from(new Set(albums.map(a => a.artist))).sort()];

  const filteredAlbums = albums.filter(album => {
    if (selectedGenre !== 'all' && album.genre !== selectedGenre) return false;
    if (selectedYear !== 'all' && album.year.toString() !== selectedYear) return false;
    if (selectedArtist !== 'all' && album.artist !== selectedArtist) return false;
    return true;
  });

  const addToCart = (album: Album) => {
    setCart([...cart, album]);
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <Icon name="Disc3" size={32} className="text-primary" />
            <h1 className="text-2xl font-bold text-primary">Vinyl Kingdom</h1>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <button onClick={() => setActiveTab('catalog')} className={`text-sm font-medium transition-colors hover:text-primary ${activeTab === 'catalog' ? 'text-primary' : 'text-muted-foreground'}`}>
              Каталог
            </button>
            <button onClick={() => setActiveTab('about')} className={`text-sm font-medium transition-colors hover:text-primary ${activeTab === 'about' ? 'text-primary' : 'text-muted-foreground'}`}>
              О магазине
            </button>
            <button onClick={() => setActiveTab('staff')} className={`text-sm font-medium transition-colors hover:text-primary ${activeTab === 'staff' ? 'text-primary' : 'text-muted-foreground'}`}>
              Персонал
            </button>
            <button onClick={() => setActiveTab('contacts')} className={`text-sm font-medium transition-colors hover:text-primary ${activeTab === 'contacts' ? 'text-primary' : 'text-muted-foreground'}`}>
              Контакты
            </button>
          </nav>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <Icon name="ShoppingCart" size={20} />
                {cart.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {cart.length}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Корзина</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                {cart.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">Корзина пуста</p>
                ) : (
                  <>
                    {cart.map((item, index) => (
                      <div key={index} className="flex items-center gap-3 pb-3 border-b">
                        <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded" />
                        <div className="flex-1">
                          <p className="font-medium text-sm">{item.title}</p>
                          <p className="text-xs text-muted-foreground">{item.artist}</p>
                          <p className="text-sm font-bold text-primary">{item.price} ₽</p>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)}>
                          <Icon name="Trash2" size={16} />
                        </Button>
                      </div>
                    ))}
                    <div className="pt-4 border-t">
                      <div className="flex justify-between items-center mb-4">
                        <span className="font-bold">Итого:</span>
                        <span className="text-xl font-bold text-primary">{totalPrice} ₽</span>
                      </div>
                      <Button className="w-full" size="lg">
                        Оформить заказ
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main className="container px-4 py-8">
        {activeTab === 'catalog' && (
          <div>
            <div className="relative h-[400px] rounded-lg overflow-hidden mb-8" style={{backgroundImage: `url(https://cdn.poehali.dev/files/123.png)`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 flex items-center">
                <div className="max-w-2xl px-8">
                  <h2 className="text-5xl font-bold text-white mb-4">Винтажные виниловые пластинки</h2>
                  <p className="text-xl text-white/90 mb-6">Коллекционные издания 70-80х годов. Аутентичный звук эпохи.</p>
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    <Icon name="Music" size={20} className="mr-2" />
                    Смотреть каталог
                  </Button>
                </div>
              </div>
            </div>

            <div className="mb-8 p-6 bg-card rounded-lg border">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Icon name="Filter" size={20} />
                Фильтры
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Жанр</label>
                  <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {genres.map(genre => (
                        <SelectItem key={genre} value={genre}>
                          {genre === 'all' ? 'Все жанры' : genre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Год выпуска</label>
                  <Select value={selectedYear} onValueChange={setSelectedYear}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map(year => (
                        <SelectItem key={year} value={year}>
                          {year === 'all' ? 'Все годы' : year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Исполнитель</label>
                  <Select value={selectedArtist} onValueChange={setSelectedArtist}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {artists.map(artist => (
                        <SelectItem key={artist} value={artist}>
                          {artist === 'all' ? 'Все исполнители' : artist}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {(selectedGenre !== 'all' || selectedYear !== 'all' || selectedArtist !== 'all') && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-4"
                  onClick={() => {
                    setSelectedGenre('all');
                    setSelectedYear('all');
                    setSelectedArtist('all');
                  }}
                >
                  <Icon name="X" size={16} className="mr-2" />
                  Сбросить фильтры
                </Button>
              )}
            </div>

            <div className="mb-4">
              <p className="text-muted-foreground">Найдено: {filteredAlbums.length} пластинок</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredAlbums.map(album => (
                <Card key={album.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="relative aspect-square overflow-hidden">
                    <img 
                      src={album.image} 
                      alt={album.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <Badge className="absolute top-2 right-2 bg-secondary">{album.condition}</Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg mb-1 line-clamp-1">{album.title}</h3>
                    <p className="text-sm text-muted-foreground mb-1">{album.artist}</p>
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="outline" className="text-xs">{album.genre}</Badge>
                      <Badge variant="outline" className="text-xs">{album.year}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-primary">{album.price} ₽</span>
                      <Button size="sm" onClick={() => addToCart(album)}>
                        <Icon name="Plus" size={16} className="mr-1" />
                        В корзину
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'about' && (
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">О магазине Vinyl Kingdom</h2>
            <div className="prose prose-lg">
              <p className="text-lg mb-4">
                Добро пожаловать в Vinyl Kingdom — ваш портал в золотую эру музыки! 
                Мы специализируемся на коллекционных виниловых пластинках 70-80х годов.
              </p>
              <p className="text-lg mb-4">
                Наша коллекция включает редкие издания легендарных исполнителей: Pink Floyd, 
                The Beatles, Led Zeppelin, Fleetwood Mac и многих других. Каждая пластинка 
                тщательно проверена и оценена по международной системе градации.
              </p>
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <Card className="p-6">
                  <Icon name="Shield" size={40} className="text-primary mb-4" />
                  <h3 className="font-bold text-xl mb-2">Гарантия качества</h3>
                  <p>Каждая пластинка проходит экспертную проверку состояния</p>
                </Card>
                <Card className="p-6">
                  <Icon name="Package" size={40} className="text-primary mb-4" />
                  <h3 className="font-bold text-xl mb-2">Бережная доставка</h3>
                  <p>Специальная упаковка для сохранности ваших покупок</p>
                </Card>
                <Card className="p-6">
                  <Icon name="Star" size={40} className="text-primary mb-4" />
                  <h3 className="font-bold text-xl mb-2">Редкие издания</h3>
                  <p>Эксклюзивные и коллекционные релизы со всего мира</p>
                </Card>
                <Card className="p-6">
                  <Icon name="Heart" size={40} className="text-primary mb-4" />
                  <h3 className="font-bold text-xl mb-2">Любовь к винилу</h3>
                  <p>Более 15 лет опыта работы с винтажными пластинками</p>
                </Card>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'staff' && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">Наша команда</h2>
            <p className="text-lg text-muted-foreground mb-8">Познакомьтесь с экспертами Vinyl Kingdom — настоящими ценителями винила</p>
            <div className="grid md:grid-cols-3 gap-6">
              {staff.map(member => (
                <Card key={member.id} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Icon name="User" size={48} className="text-primary" />
                  </div>
                  <h3 className="font-bold text-xl text-center mb-2">{member.name}</h3>
                  <p className="text-primary text-center font-medium mb-3">{member.position}</p>
                  <p className="text-sm text-muted-foreground text-center">{member.description}</p>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'contacts' && (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">Контакты</h2>
            <Card className="p-6">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Icon name="MapPin" size={24} className="text-primary mt-1" />
                  <div>
                    <h3 className="font-bold mb-1">Адрес</h3>
                    <p className="text-muted-foreground">г. Москва, ул. Виниловая, д. 77</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Icon name="Phone" size={24} className="text-primary mt-1" />
                  <div>
                    <h3 className="font-bold mb-1">Телефон</h3>
                    <p className="text-muted-foreground">+7 (495) 123-45-67</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Icon name="Mail" size={24} className="text-primary mt-1" />
                  <div>
                    <h3 className="font-bold mb-1">Email</h3>
                    <p className="text-muted-foreground">info@vinylkingdom.ru</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Icon name="Clock" size={24} className="text-primary mt-1" />
                  <div>
                    <h3 className="font-bold mb-1">Режим работы</h3>
                    <p className="text-muted-foreground">Пн-Пт: 10:00 - 20:00</p>
                    <p className="text-muted-foreground">Сб-Вс: 11:00 - 18:00</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </main>

      <footer className="border-t mt-16 py-8 bg-card">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Icon name="Disc3" size={24} className="text-primary" />
              <span className="font-bold">Vinyl Kingdom</span>
            </div>
            <p className="text-sm text-muted-foreground">© 2026 Vinyl Kingdom. Все права защищены.</p>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon">
                <Icon name="Instagram" size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="Facebook" size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="Twitter" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Index;