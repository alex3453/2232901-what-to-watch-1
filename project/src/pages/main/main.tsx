import FilmsList from '../../components/films-list/films-list';
import Logo from '../../components/logo/logo';
import Footer from '../../components/footer/footer';
import GenresList from '../../components/genres-list/genres-list';
import {useAppDispatch, useAppSelector} from '../../hooks';
import ShowMoreButton from '../../components/show-more-button/show-more-button';
import Loading from '../../components/loading/loading';
import {useEffect} from 'react';
import {fetchFilms, fetchPromoFilm} from '../../store/api-actions';

function Main(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFilms());
    dispatch(fetchPromoFilm());
  }, [dispatch]);

  const filmsCount = useAppSelector((state) => state.filmCardsCount);
  const shownFilmsCount = useAppSelector((state) => state.filteredFilms).length;
  const films = useAppSelector((state) => state.filteredFilms).slice(0, filmsCount);
  const promoFilm = useAppSelector((state) => state.promoFilm);

  const isLoading = useAppSelector((state) => state.isLoading);
  if (isLoading) {
    return (
      <Loading />
    );
  }

  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={promoFilm.backgroundImage} alt={promoFilm.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header film-card__head">
          <Logo/>

          <ul className="user-block">
            <li className="user-block__item">
              <div className="user-block__avatar">
                <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
              </div>
            </li>
            <li className="user-block__item">
              <a className="user-block__link">Sign out</a>
            </li>
          </ul>
        </header>

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src={promoFilm.posterImage} alt={promoFilm.name} width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{promoFilm.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{promoFilm.genre}</span>
                <span className="film-card__year">{promoFilm.released}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list film-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                  <span className="film-card__count">9</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenresList />
          <FilmsList films={films}/>
          {
            shownFilmsCount !== filmsCount && <ShowMoreButton />
          }

        </section>

        <Footer/>
      </div>
    </>
  );
}

export default Main;
