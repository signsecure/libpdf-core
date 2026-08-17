# Benchmark Report

> Generated on 2026-08-17 at 07:03:59 UTC
>
> System: linux | AMD EPYC 7763 64-Core Processor (4 cores) | 16GB RAM | Bun 1.3.14

---

## Contents

- [Comparison](#comparison)
- [Copying](#copying)
- [Drawing](#drawing)
- [Forms](#forms)
- [Loading](#loading)
- [Saving](#saving)
- [Splitting](#splitting)

## Comparison

### Load PDF

| Benchmark       | ops/sec |     Mean |      p99 |    RME | Samples |
| :-------------- | ------: | -------: | -------: | -----: | ------: |
| libpdf          |    54.4 |  18.38ms |  19.76ms | ±1.31% |      28 |
| @cantoo/pdf-lib |     4.6 | 218.89ms | 228.58ms | ±1.70% |      10 |
| pdf-lib         |     4.5 | 224.30ms | 227.53ms | ±0.67% |      10 |

- **libpdf** is 11.91x faster than @cantoo/pdf-lib
- **libpdf** is 12.20x faster than pdf-lib

### Create blank PDF

| Benchmark       | ops/sec |  Mean |    p99 |    RME | Samples |
| :-------------- | ------: | ----: | -----: | -----: | ------: |
| libpdf          |   15.0K |  67us |  156us | ±2.09% |   7,518 |
| pdf-lib         |    2.8K | 362us | 1.36ms | ±2.58% |   1,382 |
| @cantoo/pdf-lib |    2.2K | 449us | 1.76ms | ±3.43% |   1,114 |

- **libpdf** is 5.44x faster than pdf-lib
- **libpdf** is 6.75x faster than @cantoo/pdf-lib

### Add 10 pages

| Benchmark       | ops/sec |  Mean |    p99 |    RME | Samples |
| :-------------- | ------: | ----: | -----: | -----: | ------: |
| libpdf          |    8.0K | 124us |  274us | ±1.00% |   4,022 |
| pdf-lib         |    2.3K | 441us | 1.90ms | ±4.58% |   1,135 |
| @cantoo/pdf-lib |    2.1K | 486us | 2.77ms | ±5.17% |   1,029 |

- **libpdf** is 3.54x faster than pdf-lib
- **libpdf** is 3.91x faster than @cantoo/pdf-lib

### Draw 50 rectangles

| Benchmark       | ops/sec |   Mean |    p99 |    RME | Samples |
| :-------------- | ------: | -----: | -----: | -----: | ------: |
| libpdf          |    2.7K |  373us | 1.18ms | ±2.08% |   1,341 |
| @cantoo/pdf-lib |   639.1 | 1.56ms | 4.11ms | ±5.70% |     322 |
| pdf-lib         |   592.6 | 1.69ms | 7.66ms | ±8.44% |     298 |

- **libpdf** is 4.20x faster than @cantoo/pdf-lib
- **libpdf** is 4.53x faster than pdf-lib

### Load and save PDF

| Benchmark       | ops/sec |     Mean |      p99 |    RME | Samples |
| :-------------- | ------: | -------: | -------: | -----: | ------: |
| libpdf          |    51.1 |  19.55ms |  23.55ms | ±3.19% |      26 |
| pdf-lib         |     3.2 | 312.21ms | 332.05ms | ±1.82% |      10 |
| @cantoo/pdf-lib |     1.7 | 591.07ms | 624.65ms | ±2.51% |      10 |

- **libpdf** is 15.97x faster than pdf-lib
- **libpdf** is 30.23x faster than @cantoo/pdf-lib

### Load, modify, and save PDF

| Benchmark       | ops/sec |     Mean |      p99 |    RME | Samples |
| :-------------- | ------: | -------: | -------: | -----: | ------: |
| pdf-lib         |     3.2 | 308.00ms | 316.74ms | ±1.26% |      10 |
| libpdf          |     3.0 | 335.52ms | 353.10ms | ±1.49% |      10 |
| @cantoo/pdf-lib |     1.7 | 576.08ms | 624.08ms | ±3.23% |      10 |

- **pdf-lib** is 1.09x faster than libpdf
- **pdf-lib** is 1.87x faster than @cantoo/pdf-lib

### Extract single page from 100-page PDF

| Benchmark       | ops/sec |   Mean |     p99 |    RME | Samples |
| :-------------- | ------: | -----: | ------: | -----: | ------: |
| libpdf          |   266.9 | 3.75ms |  4.44ms | ±0.94% |     134 |
| pdf-lib         |   111.7 | 8.95ms | 12.04ms | ±2.30% |      56 |
| @cantoo/pdf-lib |   107.3 | 9.32ms | 11.80ms | ±2.06% |      54 |

- **libpdf** is 2.39x faster than pdf-lib
- **libpdf** is 2.49x faster than @cantoo/pdf-lib

### Split 100-page PDF into single-page PDFs

| Benchmark       | ops/sec |    Mean |     p99 |     RME | Samples |
| :-------------- | ------: | ------: | ------: | ------: | ------: |
| libpdf          |    24.5 | 40.75ms | 50.03ms |  ±4.44% |      13 |
| @cantoo/pdf-lib |    13.3 | 75.13ms | 84.35ms |  ±5.82% |       7 |
| pdf-lib         |    13.3 | 75.37ms | 94.30ms | ±10.63% |       7 |

- **libpdf** is 1.84x faster than @cantoo/pdf-lib
- **libpdf** is 1.85x faster than pdf-lib

### Split 2000-page PDF into single-page PDFs (0.9MB)

| Benchmark       | ops/sec |     Mean |      p99 |    RME | Samples |
| :-------------- | ------: | -------: | -------: | -----: | ------: |
| libpdf          |     1.4 | 729.32ms | 729.32ms | ±0.00% |       1 |
| pdf-lib         |   0.773 |    1.29s |    1.29s | ±0.00% |       1 |
| @cantoo/pdf-lib |   0.707 |    1.42s |    1.42s | ±0.00% |       1 |

- **libpdf** is 1.77x faster than pdf-lib
- **libpdf** is 1.94x faster than @cantoo/pdf-lib

### Copy 10 pages between documents

| Benchmark       | ops/sec |    Mean |     p99 |    RME | Samples |
| :-------------- | ------: | ------: | ------: | -----: | ------: |
| libpdf          |   213.4 |  4.69ms |  5.54ms | ±0.98% |     107 |
| pdf-lib         |    87.2 | 11.47ms | 13.19ms | ±1.39% |      44 |
| @cantoo/pdf-lib |    78.0 | 12.82ms | 13.75ms | ±1.12% |      40 |

- **libpdf** is 2.45x faster than pdf-lib
- **libpdf** is 2.74x faster than @cantoo/pdf-lib

### Merge 2 x 100-page PDFs

| Benchmark       | ops/sec |    Mean |     p99 |    RME | Samples |
| :-------------- | ------: | ------: | ------: | -----: | ------: |
| libpdf          |    63.5 | 15.75ms | 17.07ms | ±0.93% |      32 |
| pdf-lib         |    19.3 | 51.81ms | 53.68ms | ±1.22% |      10 |
| @cantoo/pdf-lib |    15.7 | 63.87ms | 71.59ms | ±4.37% |       8 |

- **libpdf** is 3.29x faster than pdf-lib
- **libpdf** is 4.06x faster than @cantoo/pdf-lib

### Fill FINTRAC form fields

| Benchmark       | ops/sec |    Mean |     p99 |    RME | Samples |
| :-------------- | ------: | ------: | ------: | -----: | ------: |
| libpdf          |    47.8 | 20.93ms | 24.06ms | ±2.98% |      24 |
| pdf-lib         |    37.7 | 26.50ms | 34.25ms | ±4.57% |      19 |
| @cantoo/pdf-lib |    37.4 | 26.77ms | 35.88ms | ±5.27% |      19 |

- **libpdf** is 1.27x faster than pdf-lib
- **libpdf** is 1.28x faster than @cantoo/pdf-lib

### Fill and flatten FINTRAC form

| Benchmark       | ops/sec |    Mean |     p99 |    RME | Samples |
| :-------------- | ------: | ------: | ------: | -----: | ------: |
| libpdf          |    60.9 | 16.43ms | 18.37ms | ±1.74% |      31 |
| pdf-lib         |  FAILED |       - |       - |      - |       0 |
| @cantoo/pdf-lib |    32.4 | 30.83ms | 34.14ms | ±3.16% |      17 |

- **libpdf** is 1.88x faster than @cantoo/pdf-lib

## Copying

### Copy pages between documents

| Benchmark                       | ops/sec |   Mean |     p99 |    RME | Samples |
| :------------------------------ | ------: | -----: | ------: | -----: | ------: |
| copy 1 page                     |   887.8 | 1.13ms |  2.83ms | ±3.07% |     444 |
| copy 10 pages from 100-page PDF |   212.4 | 4.71ms |  8.71ms | ±2.65% |     107 |
| copy all 100 pages              |   124.0 | 8.06ms | 12.19ms | ±2.23% |      63 |

- **copy 1 page** is 4.18x faster than copy 10 pages from 100-page PDF
- **copy 1 page** is 7.16x faster than copy all 100 pages

### Duplicate pages within same document

| Benchmark                                 | ops/sec |   Mean |    p99 |    RME | Samples |
| :---------------------------------------- | ------: | -----: | -----: | -----: | ------: |
| duplicate page 0                          |   994.3 | 1.01ms | 1.36ms | ±0.64% |     498 |
| duplicate all pages (double the document) |   987.3 | 1.01ms | 1.30ms | ±0.59% |     494 |

- **duplicate page 0** is 1.01x faster than duplicate all pages (double the document)

### Merge PDFs

| Benchmark               | ops/sec |    Mean |     p99 |    RME | Samples |
| :---------------------- | ------: | ------: | ------: | -----: | ------: |
| merge 2 small PDFs      |   638.0 |  1.57ms |  1.94ms | ±0.94% |     320 |
| merge 10 small PDFs     |   121.1 |  8.26ms | 11.65ms | ±2.27% |      61 |
| merge 2 x 100-page PDFs |    66.7 | 15.00ms | 19.21ms | ±2.46% |      34 |

- **merge 2 small PDFs** is 5.27x faster than merge 10 small PDFs
- **merge 2 small PDFs** is 9.57x faster than merge 2 x 100-page PDFs

## Drawing

| Benchmark                           | ops/sec |   Mean |    p99 |    RME | Samples |
| :---------------------------------- | ------: | -----: | -----: | -----: | ------: |
| draw 100 lines                      |    1.7K |  575us | 1.21ms | ±1.30% |     870 |
| draw 100 rectangles                 |    1.5K |  648us | 1.62ms | ±3.00% |     772 |
| draw 100 circles                    |    1.0K |  964us | 1.75ms | ±1.52% |     519 |
| create 10 pages with mixed content  |   670.6 | 1.49ms | 2.68ms | ±2.09% |     336 |
| draw 100 text lines (standard font) |   607.4 | 1.65ms | 3.05ms | ±1.76% |     304 |

- **draw 100 lines** is 1.13x faster than draw 100 rectangles
- **draw 100 lines** is 1.68x faster than draw 100 circles
- **draw 100 lines** is 2.59x faster than create 10 pages with mixed content
- **draw 100 lines** is 2.86x faster than draw 100 text lines (standard font)

## Forms

| Benchmark         | ops/sec |    Mean |     p99 |    RME | Samples |
| :---------------- | ------: | ------: | ------: | -----: | ------: |
| read field values |   355.8 |  2.81ms |  5.13ms | ±2.08% |     178 |
| get form fields   |   310.9 |  3.22ms |  6.79ms | ±4.29% |     156 |
| flatten form      |   124.7 |  8.02ms | 10.11ms | ±1.52% |      63 |
| fill text fields  |    78.0 | 12.83ms | 16.82ms | ±4.23% |      39 |

- **read field values** is 1.14x faster than get form fields
- **read field values** is 2.85x faster than flatten form
- **read field values** is 4.56x faster than fill text fields

## Loading

| Benchmark              | ops/sec |    Mean |     p99 |    RME | Samples |
| :--------------------- | ------: | ------: | ------: | -----: | ------: |
| load small PDF (888B)  |   15.9K |    63us |   191us | ±2.48% |   7,956 |
| load medium PDF (19KB) |   11.2K |    90us |   123us | ±0.44% |   5,582 |
| load form PDF (116KB)  |   752.4 |  1.33ms |  2.51ms | ±1.72% |     377 |
| load heavy PDF (2.0MB) |    53.6 | 18.64ms | 28.79ms | ±6.39% |      27 |

- **load small PDF (888B)** is 1.43x faster than load medium PDF (19KB)
- **load small PDF (888B)** is 21.15x faster than load form PDF (116KB)
- **load small PDF (888B)** is 296.61x faster than load heavy PDF (2.0MB)

## Saving

| Benchmark                          | ops/sec |    Mean |     p99 |    RME | Samples |
| :--------------------------------- | ------: | ------: | ------: | -----: | ------: |
| save unmodified (19KB)             |    8.8K |   113us |   344us | ±1.57% |   4,406 |
| incremental save (19KB)            |    5.6K |   178us |   377us | ±1.16% |   2,817 |
| save with modifications (19KB)     |    1.2K |   834us |  1.58ms | ±1.73% |     600 |
| save heavy PDF (2.0MB)             |    55.8 | 17.93ms | 26.51ms | ±3.72% |      28 |
| incremental save heavy PDF (2.0MB) |    52.9 | 18.89ms | 19.77ms | ±0.98% |      27 |

- **save unmodified (19KB)** is 1.56x faster than incremental save (19KB)
- **save unmodified (19KB)** is 7.35x faster than save with modifications (19KB)
- **save unmodified (19KB)** is 157.98x faster than save heavy PDF (2.0MB)
- **save unmodified (19KB)** is 166.43x faster than incremental save heavy PDF (2.0MB)

## Splitting

### Extract single page

| Benchmark                                | ops/sec |    Mean |     p99 |    RME | Samples |
| :--------------------------------------- | ------: | ------: | ------: | -----: | ------: |
| extractPages (1 page from small PDF)     |   885.5 |  1.13ms |  2.84ms | ±3.17% |     443 |
| extractPages (1 page from 100-page PDF)  |   280.4 |  3.57ms |  6.03ms | ±1.82% |     141 |
| extractPages (1 page from 2000-page PDF) |    18.3 | 54.72ms | 55.62ms | ±0.72% |      10 |

- **extractPages (1 page from small PDF)** is 3.16x faster than extractPages (1 page from 100-page PDF)
- **extractPages (1 page from small PDF)** is 48.46x faster than extractPages (1 page from 2000-page PDF)

### Split into single-page PDFs

| Benchmark                   | ops/sec |     Mean |      p99 |    RME | Samples |
| :-------------------------- | ------: | -------: | -------: | -----: | ------: |
| split 100-page PDF (0.1MB)  |    25.4 |  39.36ms |  41.31ms | ±1.27% |      13 |
| split 2000-page PDF (0.9MB) |     1.4 | 714.29ms | 714.29ms | ±0.00% |       1 |

- **split 100-page PDF (0.1MB)** is 18.15x faster than split 2000-page PDF (0.9MB)

### Batch page extraction

| Benchmark                                              | ops/sec |    Mean |     p99 |    RME | Samples |
| :----------------------------------------------------- | ------: | ------: | ------: | -----: | ------: |
| extract first 10 pages from 2000-page PDF              |    18.0 | 55.41ms | 56.72ms | ±0.69% |      10 |
| extract first 100 pages from 2000-page PDF             |    16.9 | 59.27ms | 60.72ms | ±1.18% |       9 |
| extract every 10th page from 2000-page PDF (200 pages) |    15.4 | 64.84ms | 66.77ms | ±1.32% |       8 |

- **extract first 10 pages from 2000-page PDF** is 1.07x faster than extract first 100 pages from 2000-page PDF
- **extract first 10 pages from 2000-page PDF** is 1.17x faster than extract every 10th page from 2000-page PDF (200 pages)

---

_Results are machine-dependent. Use for relative comparison only._
