# Benchmark Report

> Generated on 2026-10-12 at 14:54:38 UTC
>
> System: linux | AMD EPYC 7763 64-Core Processor (4 cores) | 16GB RAM | Bun 1.4.3

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
| libpdf          |    54.3 |  18.41ms |  19.72ms | ±1.38% |      28 |
| pdf-lib         |     4.5 | 221.96ms | 228.75ms | ±0.95% |      10 |
| @cantoo/pdf-lib |     4.5 | 222.14ms | 225.46ms | ±0.73% |      10 |

- **libpdf** is 12.06x faster than pdf-lib
- **libpdf** is 12.07x faster than @cantoo/pdf-lib

### Create blank PDF

| Benchmark       | ops/sec |  Mean |    p99 |    RME | Samples |
| :-------------- | ------: | ----: | -----: | -----: | ------: |
| libpdf          |   13.3K |  75us |  170us | ±2.91% |   6,645 |
| pdf-lib         |    2.7K | 364us | 1.40ms | ±2.47% |   1,373 |
| @cantoo/pdf-lib |    2.6K | 381us | 1.64ms | ±2.69% |   1,312 |

- **libpdf** is 4.84x faster than pdf-lib
- **libpdf** is 5.06x faster than @cantoo/pdf-lib

### Add 10 pages

| Benchmark       | ops/sec |  Mean |    p99 |    RME | Samples |
| :-------------- | ------: | ----: | -----: | -----: | ------: |
| libpdf          |    7.8K | 128us |  227us | ±1.31% |   3,892 |
| @cantoo/pdf-lib |    2.3K | 431us | 2.48ms | ±4.00% |   1,160 |
| pdf-lib         |    2.2K | 461us | 2.12ms | ±4.16% |   1,085 |

- **libpdf** is 3.36x faster than @cantoo/pdf-lib
- **libpdf** is 3.59x faster than pdf-lib

### Draw 50 rectangles

| Benchmark       | ops/sec |   Mean |    p99 |     RME | Samples |
| :-------------- | ------: | -----: | -----: | ------: | ------: |
| libpdf          |    2.7K |  367us | 1.09ms |  ±1.87% |   1,363 |
| pdf-lib         |   623.3 | 1.60ms | 7.12ms | ±10.00% |     312 |
| @cantoo/pdf-lib |   515.6 | 1.94ms | 8.57ms |  ±9.10% |     258 |

- **libpdf** is 4.37x faster than pdf-lib
- **libpdf** is 5.28x faster than @cantoo/pdf-lib

### Load and save PDF

| Benchmark       | ops/sec |     Mean |      p99 |    RME | Samples |
| :-------------- | ------: | -------: | -------: | -----: | ------: |
| libpdf          |    55.1 |  18.15ms |  20.74ms | ±1.85% |      28 |
| pdf-lib         |     3.1 | 317.92ms | 334.06ms | ±1.64% |      10 |
| @cantoo/pdf-lib |     1.8 | 553.65ms | 571.99ms | ±1.13% |      10 |

- **libpdf** is 17.51x faster than pdf-lib
- **libpdf** is 30.50x faster than @cantoo/pdf-lib

### Load, modify, and save PDF

| Benchmark       | ops/sec |     Mean |      p99 |    RME | Samples |
| :-------------- | ------: | -------: | -------: | -----: | ------: |
| pdf-lib         |     3.2 | 317.08ms | 331.19ms | ±1.30% |      10 |
| libpdf          |     2.9 | 349.14ms | 364.09ms | ±1.62% |      10 |
| @cantoo/pdf-lib |     1.8 | 564.56ms | 603.37ms | ±3.20% |      10 |

- **pdf-lib** is 1.10x faster than libpdf
- **pdf-lib** is 1.78x faster than @cantoo/pdf-lib

### Extract single page from 100-page PDF

| Benchmark       | ops/sec |   Mean |     p99 |    RME | Samples |
| :-------------- | ------: | -----: | ------: | -----: | ------: |
| libpdf          |   275.9 | 3.62ms |  4.39ms | ±0.99% |     138 |
| pdf-lib         |   111.3 | 8.98ms | 10.92ms | ±1.71% |      56 |
| @cantoo/pdf-lib |   106.4 | 9.40ms | 11.22ms | ±1.97% |      54 |

- **libpdf** is 2.48x faster than pdf-lib
- **libpdf** is 2.59x faster than @cantoo/pdf-lib

### Split 100-page PDF into single-page PDFs

| Benchmark       | ops/sec |    Mean |     p99 |     RME | Samples |
| :-------------- | ------: | ------: | ------: | ------: | ------: |
| libpdf          |    24.5 | 40.80ms | 42.94ms |  ±1.53% |      13 |
| pdf-lib         |    12.9 | 77.23ms | 91.86ms | ±10.90% |       7 |
| @cantoo/pdf-lib |    12.8 | 78.06ms | 87.56ms |  ±5.52% |       7 |

- **libpdf** is 1.89x faster than pdf-lib
- **libpdf** is 1.91x faster than @cantoo/pdf-lib

### Split 2000-page PDF into single-page PDFs (0.9MB)

| Benchmark       | ops/sec |     Mean |      p99 |    RME | Samples |
| :-------------- | ------: | -------: | -------: | -----: | ------: |
| libpdf          |     1.3 | 764.52ms | 764.52ms | ±0.00% |       1 |
| pdf-lib         |   0.735 |    1.36s |    1.36s | ±0.00% |       1 |
| @cantoo/pdf-lib |   0.677 |    1.48s |    1.48s | ±0.00% |       1 |

- **libpdf** is 1.78x faster than pdf-lib
- **libpdf** is 1.93x faster than @cantoo/pdf-lib

### Copy 10 pages between documents

| Benchmark       | ops/sec |    Mean |     p99 |    RME | Samples |
| :-------------- | ------: | ------: | ------: | -----: | ------: |
| libpdf          |   214.1 |  4.67ms |  5.56ms | ±1.28% |     108 |
| pdf-lib         |    84.5 | 11.83ms | 14.73ms | ±2.14% |      43 |
| @cantoo/pdf-lib |    75.6 | 13.24ms | 15.32ms | ±1.99% |      38 |

- **libpdf** is 2.53x faster than pdf-lib
- **libpdf** is 2.83x faster than @cantoo/pdf-lib

### Merge 2 x 100-page PDFs

| Benchmark       | ops/sec |    Mean |     p99 |    RME | Samples |
| :-------------- | ------: | ------: | ------: | -----: | ------: |
| libpdf          |    62.7 | 15.94ms | 18.11ms | ±1.57% |      32 |
| pdf-lib         |    17.7 | 56.42ms | 61.80ms | ±3.50% |       9 |
| @cantoo/pdf-lib |    15.5 | 64.55ms | 65.76ms | ±1.33% |       8 |

- **libpdf** is 3.54x faster than pdf-lib
- **libpdf** is 4.05x faster than @cantoo/pdf-lib

### Fill FINTRAC form fields

| Benchmark       | ops/sec |    Mean |     p99 |    RME | Samples |
| :-------------- | ------: | ------: | ------: | -----: | ------: |
| libpdf          |    48.9 | 20.45ms | 24.03ms | ±2.36% |      25 |
| pdf-lib         |    36.7 | 27.23ms | 40.39ms | ±5.81% |      19 |
| @cantoo/pdf-lib |    34.6 | 28.91ms | 41.76ms | ±6.18% |      18 |

- **libpdf** is 1.33x faster than pdf-lib
- **libpdf** is 1.41x faster than @cantoo/pdf-lib

### Fill and flatten FINTRAC form

| Benchmark       | ops/sec |    Mean |     p99 |    RME | Samples |
| :-------------- | ------: | ------: | ------: | -----: | ------: |
| libpdf          |    55.9 | 17.89ms | 24.72ms | ±4.11% |      28 |
| pdf-lib         |  FAILED |       - |       - |      - |       0 |
| @cantoo/pdf-lib |    31.5 | 31.75ms | 35.50ms | ±2.36% |      16 |

- **libpdf** is 1.77x faster than @cantoo/pdf-lib

## Copying

### Copy pages between documents

| Benchmark                       | ops/sec |   Mean |     p99 |    RME | Samples |
| :------------------------------ | ------: | -----: | ------: | -----: | ------: |
| copy 1 page                     |   860.4 | 1.16ms |  2.74ms | ±3.16% |     431 |
| copy 10 pages from 100-page PDF |   209.7 | 4.77ms |  7.38ms | ±2.65% |     105 |
| copy all 100 pages              |   123.8 | 8.08ms | 11.36ms | ±1.76% |      62 |

- **copy 1 page** is 4.10x faster than copy 10 pages from 100-page PDF
- **copy 1 page** is 6.95x faster than copy all 100 pages

### Duplicate pages within same document

| Benchmark                                 | ops/sec |   Mean |    p99 |    RME | Samples |
| :---------------------------------------- | ------: | -----: | -----: | -----: | ------: |
| duplicate page 0                          |    1.0K |  999us | 1.36ms | ±0.66% |     501 |
| duplicate all pages (double the document) |   987.1 | 1.01ms | 1.42ms | ±0.71% |     494 |

- **duplicate page 0** is 1.01x faster than duplicate all pages (double the document)

### Merge PDFs

| Benchmark               | ops/sec |    Mean |     p99 |    RME | Samples |
| :---------------------- | ------: | ------: | ------: | -----: | ------: |
| merge 2 small PDFs      |   633.0 |  1.58ms |  2.13ms | ±1.16% |     317 |
| merge 10 small PDFs     |   121.5 |  8.23ms | 12.71ms | ±2.06% |      61 |
| merge 2 x 100-page PDFs |    64.4 | 15.54ms | 22.80ms | ±3.90% |      33 |

- **merge 2 small PDFs** is 5.21x faster than merge 10 small PDFs
- **merge 2 small PDFs** is 9.83x faster than merge 2 x 100-page PDFs

## Drawing

| Benchmark                           | ops/sec |   Mean |    p99 |    RME | Samples |
| :---------------------------------- | ------: | -----: | -----: | -----: | ------: |
| draw 100 lines                      |    1.7K |  580us | 1.20ms | ±1.26% |     863 |
| draw 100 rectangles                 |    1.5K |  660us | 1.61ms | ±2.80% |     758 |
| draw 100 circles                    |    1.0K |  955us | 1.94ms | ±1.81% |     524 |
| create 10 pages with mixed content  |   655.5 | 1.53ms | 2.79ms | ±2.12% |     328 |
| draw 100 text lines (standard font) |   609.9 | 1.64ms | 2.93ms | ±1.71% |     305 |

- **draw 100 lines** is 1.14x faster than draw 100 rectangles
- **draw 100 lines** is 1.65x faster than draw 100 circles
- **draw 100 lines** is 2.63x faster than create 10 pages with mixed content
- **draw 100 lines** is 2.83x faster than draw 100 text lines (standard font)

## Forms

| Benchmark         | ops/sec |    Mean |     p99 |    RME | Samples |
| :---------------- | ------: | ------: | ------: | -----: | ------: |
| read field values |   341.7 |  2.93ms |  5.20ms | ±2.45% |     171 |
| get form fields   |   289.4 |  3.46ms |  6.86ms | ±5.03% |     145 |
| flatten form      |   122.5 |  8.16ms | 11.05ms | ±1.85% |      62 |
| fill text fields  |    75.4 | 13.26ms | 18.90ms | ±4.58% |      38 |

- **read field values** is 1.18x faster than get form fields
- **read field values** is 2.79x faster than flatten form
- **read field values** is 4.53x faster than fill text fields

## Loading

| Benchmark              | ops/sec |    Mean |     p99 |    RME | Samples |
| :--------------------- | ------: | ------: | ------: | -----: | ------: |
| load small PDF (888B)  |   15.9K |    63us |   187us | ±1.06% |   7,927 |
| load medium PDF (19KB) |   11.0K |    91us |   174us | ±0.70% |   5,487 |
| load form PDF (116KB)  |   786.3 |  1.27ms |  2.41ms | ±1.57% |     394 |
| load heavy PDF (2.0MB) |    55.7 | 17.96ms | 18.67ms | ±1.33% |      28 |

- **load small PDF (888B)** is 1.45x faster than load medium PDF (19KB)
- **load small PDF (888B)** is 20.16x faster than load form PDF (116KB)
- **load small PDF (888B)** is 284.78x faster than load heavy PDF (2.0MB)

## Saving

| Benchmark                          | ops/sec |    Mean |     p99 |    RME | Samples |
| :--------------------------------- | ------: | ------: | ------: | -----: | ------: |
| save unmodified (19KB)             |    9.0K |   112us |   364us | ±1.35% |   4,476 |
| incremental save (19KB)            |    6.0K |   166us |   335us | ±1.05% |   3,014 |
| save with modifications (19KB)     |    1.2K |   849us |  1.60ms | ±1.69% |     590 |
| save heavy PDF (2.0MB)             |    52.8 | 18.93ms | 26.24ms | ±3.19% |      27 |
| incremental save heavy PDF (2.0MB) |    50.8 | 19.69ms | 22.18ms | ±1.54% |      26 |

- **save unmodified (19KB)** is 1.49x faster than incremental save (19KB)
- **save unmodified (19KB)** is 7.60x faster than save with modifications (19KB)
- **save unmodified (19KB)** is 169.46x faster than save heavy PDF (2.0MB)
- **save unmodified (19KB)** is 176.23x faster than incremental save heavy PDF (2.0MB)

## Splitting

### Extract single page

| Benchmark                                | ops/sec |    Mean |     p99 |    RME | Samples |
| :--------------------------------------- | ------: | ------: | ------: | -----: | ------: |
| extractPages (1 page from small PDF)     |   869.4 |  1.15ms |  2.81ms | ±3.18% |     435 |
| extractPages (1 page from 100-page PDF)  |   279.4 |  3.58ms |  5.36ms | ±1.68% |     140 |
| extractPages (1 page from 2000-page PDF) |    17.8 | 56.30ms | 57.21ms | ±0.87% |      10 |

- **extractPages (1 page from small PDF)** is 3.11x faster than extractPages (1 page from 100-page PDF)
- **extractPages (1 page from small PDF)** is 48.95x faster than extractPages (1 page from 2000-page PDF)

### Split into single-page PDFs

| Benchmark                   | ops/sec |     Mean |      p99 |    RME | Samples |
| :-------------------------- | ------: | -------: | -------: | -----: | ------: |
| split 100-page PDF (0.1MB)  |    23.6 |  42.45ms |  49.19ms | ±3.88% |      12 |
| split 2000-page PDF (0.9MB) |     1.3 | 750.20ms | 750.20ms | ±0.00% |       1 |

- **split 100-page PDF (0.1MB)** is 17.67x faster than split 2000-page PDF (0.9MB)

### Batch page extraction

| Benchmark                                              | ops/sec |    Mean |     p99 |    RME | Samples |
| :----------------------------------------------------- | ------: | ------: | ------: | -----: | ------: |
| extract first 10 pages from 2000-page PDF              |    17.4 | 57.54ms | 59.02ms | ±0.99% |       9 |
| extract first 100 pages from 2000-page PDF             |    16.2 | 61.90ms | 63.24ms | ±1.36% |       9 |
| extract every 10th page from 2000-page PDF (200 pages) |    15.0 | 66.75ms | 67.89ms | ±0.99% |       8 |

- **extract first 10 pages from 2000-page PDF** is 1.08x faster than extract first 100 pages from 2000-page PDF
- **extract first 10 pages from 2000-page PDF** is 1.16x faster than extract every 10th page from 2000-page PDF (200 pages)

---

_Results are machine-dependent. Use for relative comparison only._
