import { useEffect, useState } from 'react';
import { Box, IconButton, Stack } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { asset } from '../../utils/asset';

/** Слайдер баннеров: переключение стрелками и точками, автопрокрутка. */
const HeroSlider = ({ slides, height = 360, autoPlay = true }) => {
  const [index, setIndex] = useState(0);
  const total = slides.length;

  useEffect(() => {
    if (!autoPlay || total < 2) return undefined;
    const timer = window.setInterval(() => setIndex((current) => (current + 1) % total), 6000);
    return () => window.clearInterval(timer);
  }, [autoPlay, total]);

  if (!total) return null;

  return (
    <Box sx={{ position: 'relative', borderRadius: 2, overflow: 'hidden', height, bgcolor: 'action.hover' }}>
      {slides.map((slide, slideIndex) => (
        <Box
          key={slide.image}
          component="img"
          src={asset(slide.image)}
          alt={slide.alt}
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: slideIndex === index ? 1 : 0,
            transition: 'opacity .6s ease',
          }}
        />
      ))}

      {total > 1 && (
        <>
          <IconButton
            onClick={() => setIndex((current) => (current - 1 + total) % total)}
            aria-label="Предыдущий баннер"
            sx={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', bgcolor: 'rgba(255,255,255,.7)' }}
          >
            <ChevronLeftIcon />
          </IconButton>
          <IconButton
            onClick={() => setIndex((current) => (current + 1) % total)}
            aria-label="Следующий баннер"
            sx={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', bgcolor: 'rgba(255,255,255,.7)' }}
          >
            <ChevronRightIcon />
          </IconButton>

          <Stack
            direction="row"
            spacing={1}
            sx={{
              position: 'absolute',
              bottom: 12,
              left: '50%',
              transform: 'translateX(-50%)',
              p: 0.75,
              borderRadius: 4,
              bgcolor: 'rgba(20,25,35,.55)',
            }}
          >
            {slides.map((slide, slideIndex) => (
              <Box
                key={slide.image}
                component="button"
                type="button"
                aria-label={`Баннер ${slideIndex + 1}`}
                onClick={() => setIndex(slideIndex)}
                sx={{
                  width: 10,
                  height: 10,
                  p: 0,
                  border: 'none',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  bgcolor: slideIndex === index ? 'common.white' : 'rgba(255,255,255,.45)',
                }}
              />
            ))}
          </Stack>
        </>
      )}
    </Box>
  );
};

export default HeroSlider;
