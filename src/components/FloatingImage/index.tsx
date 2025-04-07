import styles from './styles.module.css';

type FloatingImageTypes = {
  image?: string;
  width?: string;
};

const FloatingImage = ({ image, width }: FloatingImageTypes) => {
  return (
    <>
      {image ? (
        <div className={styles.floatingImageContainer}>
          <div className={styles.floatingImage}>
            <img
              className={styles.image}
              style={{ width }}
              src={image}
              alt='image'
            />
          </div>
          <div className={styles.shadow}>
            <img src='/shadow.svg' alt='image shadow' />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default FloatingImage;
