# Benchmark Report

> Generated on 2026-07-27 at 10:00:24 UTC
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
| libpdf          |    52.6 |  19.03ms |  27.70ms | ±4.46% |      27 |
| pdf-lib         |     4.6 | 218.24ms | 231.72ms | ±1.74% |      10 |
| @cantoo/pdf-lib |     4.4 | 227.62ms | 242.69ms | ±2.26% |      10 |

- **libpdf** is 11.47x faster than pdf-lib
- **libpdf** is 11.96x faster than @cantoo/pdf-lib

### Create blank PDF

| Benchmark       | ops/sec |  Mean |    p99 |    RME | Samples |
| :-------------- | ------: | ----: | -----: | -----: | ------: |
| libpdf          |   14.3K |  70us |  158us | ±1.88% |   7,135 |
| pdf-lib         |    2.8K | 362us | 1.46ms | ±3.45% |   1,382 |
| @cantoo/pdf-lib |    2.7K | 371us | 1.63ms | ±3.06% |   1,349 |

- **libpdf** is 5.17x faster than pdf-lib
- **libpdf** is 5.30x faster than @cantoo/pdf-lib

### Add 10 pages

| Benchmark       | ops/sec |  Mean |    p99 |    RME | Samples |
| :-------------- | ------: | ----: | -----: | -----: | ------: |
| libpdf          |    8.1K | 123us |  203us | ±1.16% |   4,062 |
| @cantoo/pdf-lib |    2.5K | 407us | 2.14ms | ±3.57% |   1,230 |
| pdf-lib         |    2.3K | 438us | 1.81ms | ±3.10% |   1,144 |

- **libpdf** is 3.30x faster than @cantoo/pdf-lib
- **libpdf** is 3.56x faster than pdf-lib

### Draw 50 rectangles

| Benchmark       | ops/sec |   Mean |    p99 |    RME | Samples |
| :-------------- | ------: | -----: | -----: | -----: | ------: |
| libpdf          |    2.7K |  364us | 1.00ms | ±1.80% |   1,373 |
| pdf-lib         |   683.3 | 1.46ms | 6.12ms | ±7.63% |     342 |
| @cantoo/pdf-lib |   573.8 | 1.74ms | 5.00ms | ±5.69% |     287 |

- **libpdf** is 4.02x faster than pdf-lib
- **libpdf** is 4.78x faster than @cantoo/pdf-lib

### Load and save PDF

| Benchmark       | ops/sec |     Mean |      p99 |    RME | Samples |
| :-------------- | ------: | -------: | -------: | -----: | ------: |
| libpdf          |    53.6 |  18.66ms |  28.72ms | ±4.75% |      27 |
| pdf-lib         |     3.1 | 321.70ms | 338.12ms | ±2.04% |      10 |
| @cantoo/pdf-lib |     1.8 | 561.02ms | 584.48ms | ±1.51% |      10 |

- **libpdf** is 17.24x faster than pdf-lib
- **libpdf** is 30.06x faster than @cantoo/pdf-lib

### Load, modify, and save PDF

| Benchmark       | ops/sec |     Mean |      p99 |    RME | Samples |
| :-------------- | ------: | -------: | -------: | -----: | ------: |
| pdf-lib         |     3.2 | 312.60ms | 324.65ms | ±1.20% |      10 |
| libpdf          |     2.9 | 342.92ms | 359.49ms | ±1.36% |      10 |
| @cantoo/pdf-lib |     1.7 | 594.93ms | 625.83ms | ±3.04% |      10 |

- **pdf-lib** is 1.10x faster than libpdf
- **pdf-lib** is 1.90x faster than @cantoo/pdf-lib

### Extract single page from 100-page PDF

| Benchmark       | ops/sec |   Mean |     p99 |    RME | Samples |
| :-------------- | ------: | -----: | ------: | -----: | ------: |
| libpdf          |   275.3 | 3.63ms |  4.45ms | ±0.98% |     138 |
| pdf-lib         |   110.4 | 9.06ms | 11.16ms | ±1.81% |      56 |
| @cantoo/pdf-lib |   100.9 | 9.91ms | 17.83ms | ±3.93% |      51 |

- **libpdf** is 2.49x faster than pdf-lib
- **libpdf** is 2.73x faster than @cantoo/pdf-lib

### Split 100-page PDF into single-page PDFs

| Benchmark       | ops/sec |    Mean |     p99 |    RME | Samples |
| :-------------- | ------: | ------: | ------: | -----: | ------: |
| libpdf          |    24.2 | 41.25ms | 46.04ms | ±2.98% |      13 |
| pdf-lib         |    13.2 | 75.59ms | 80.14ms | ±4.58% |       7 |
| @cantoo/pdf-lib |    13.0 | 76.78ms | 79.53ms | ±1.97% |       7 |

- **libpdf** is 1.83x faster than pdf-lib
- **libpdf** is 1.86x faster than @cantoo/pdf-lib

### Split 2000-page PDF into single-page PDFs (0.9MB)

| Benchmark       | ops/sec |     Mean |      p99 |    RME | Samples |
| :-------------- | ------: | -------: | -------: | -----: | ------: |
| libpdf          |     1.3 | 773.93ms | 773.93ms | ±0.00% |       1 |
| pdf-lib         |   0.743 |    1.35s |    1.35s | ±0.00% |       1 |
| @cantoo/pdf-lib |   0.686 |    1.46s |    1.46s | ±0.00% |       1 |

- **libpdf** is 1.74x faster than pdf-lib
- **libpdf** is 1.88x faster than @cantoo/pdf-lib

### Copy 10 pages between documents

| Benchmark       | ops/sec |    Mean |     p99 |    RME | Samples |
| :-------------- | ------: | ------: | ------: | -----: | ------: |
| libpdf          |   213.0 |  4.69ms |  5.74ms | ±1.28% |     107 |
| pdf-lib         |    83.3 | 12.01ms | 14.91ms | ±2.01% |      42 |
| @cantoo/pdf-lib |    74.5 | 13.43ms | 14.88ms | ±1.66% |      38 |

- **libpdf** is 2.56x faster than pdf-lib
- **libpdf** is 2.86x faster than @cantoo/pdf-lib

### Merge 2 x 100-page PDFs

| Benchmark       | ops/sec |    Mean |     p99 |    RME | Samples |
| :-------------- | ------: | ------: | ------: | -----: | ------: |
| libpdf          |    63.0 | 15.86ms | 18.98ms | ±1.69% |      32 |
| pdf-lib         |    18.8 | 53.19ms | 54.84ms | ±1.21% |      10 |
| @cantoo/pdf-lib |    15.5 | 64.52ms | 65.04ms | ±0.87% |       8 |

- **libpdf** is 3.35x faster than pdf-lib
- **libpdf** is 4.07x faster than @cantoo/pdf-lib

### Fill FINTRAC form fields

| Benchmark       | ops/sec |    Mean |     p99 |    RME | Samples |
| :-------------- | ------: | ------: | ------: | -----: | ------: |
| libpdf          |    45.3 | 22.09ms | 27.63ms | ±4.37% |      23 |
| pdf-lib         |    35.8 | 27.94ms | 37.88ms | ±5.11% |      18 |
| @cantoo/pdf-lib |    34.5 | 29.00ms | 42.98ms | ±6.95% |      18 |

- **libpdf** is 1.26x faster than pdf-lib
- **libpdf** is 1.31x faster than @cantoo/pdf-lib

### Fill and flatten FINTRAC form

| Benchmark       | ops/sec |    Mean |     p99 |    RME | Samples |
| :-------------- | ------: | ------: | ------: | -----: | ------: |
| libpdf          |    54.9 | 18.23ms | 22.51ms | ±2.70% |      28 |
| pdf-lib         |  FAILED |       - |       - |      - |       0 |
| @cantoo/pdf-lib |    30.9 | 32.34ms | 52.71ms | ±9.10% |      16 |

- **libpdf** is 1.77x faster than @cantoo/pdf-lib

## Copying

### Copy pages between documents

| Benchmark                       | ops/sec |   Mean |    p99 |    RME | Samples |
| :------------------------------ | ------: | -----: | -----: | -----: | ------: |
| copy 1 page                     |   863.0 | 1.16ms | 2.89ms | ±3.41% |     432 |
| copy 10 pages from 100-page PDF |   215.8 | 4.63ms | 5.99ms | ±1.56% |     108 |
| copy all 100 pages              |   124.1 | 8.06ms | 8.97ms | ±0.85% |      63 |

- **copy 1 page** is 4.00x faster than copy 10 pages from 100-page PDF
- **copy 1 page** is 6.96x faster than copy all 100 pages

### Duplicate pages within same document

| Benchmark                                 | ops/sec |   Mean |    p99 |    RME | Samples |
| :---------------------------------------- | ------: | -----: | -----: | -----: | ------: |
| duplicate all pages (double the document) |   988.0 | 1.01ms | 1.41ms | ±0.76% |     494 |
| duplicate page 0                          |   984.7 | 1.02ms | 1.42ms | ±0.77% |     493 |

- **duplicate all pages (double the document)** is 1.00x faster than duplicate page 0

### Merge PDFs

| Benchmark               | ops/sec |    Mean |     p99 |    RME | Samples |
| :---------------------- | ------: | ------: | ------: | -----: | ------: |
| merge 2 small PDFs      |   637.2 |  1.57ms |  2.08ms | ±1.16% |     319 |
| merge 10 small PDFs     |   123.7 |  8.08ms | 12.05ms | ±2.50% |      62 |
| merge 2 x 100-page PDFs |    67.2 | 14.87ms | 19.22ms | ±2.67% |      34 |

- **merge 2 small PDFs** is 5.15x faster than merge 10 small PDFs
- **merge 2 small PDFs** is 9.48x faster than merge 2 x 100-page PDFs

## Drawing

| Benchmark                           | ops/sec |   Mean |    p99 |    RME | Samples |
| :---------------------------------- | ------: | -----: | -----: | -----: | ------: |
| draw 100 lines                      |    1.8K |  564us | 1.19ms | ±1.27% |     887 |
| draw 100 rectangles                 |    1.6K |  636us | 1.49ms | ±2.91% |     787 |
| draw 100 circles                    |    1.1K |  946us | 1.85ms | ±1.53% |     529 |
| create 10 pages with mixed content  |   680.0 | 1.47ms | 2.64ms | ±1.98% |     340 |
| draw 100 text lines (standard font) |   599.3 | 1.67ms | 3.09ms | ±2.31% |     300 |

- **draw 100 lines** is 1.13x faster than draw 100 rectangles
- **draw 100 lines** is 1.68x faster than draw 100 circles
- **draw 100 lines** is 2.61x faster than create 10 pages with mixed content
- **draw 100 lines** is 2.96x faster than draw 100 text lines (standard font)

## Forms

| Benchmark         | ops/sec |    Mean |     p99 |    RME | Samples |
| :---------------- | ------: | ------: | ------: | -----: | ------: |
| read field values |   345.2 |  2.90ms |  5.32ms | ±2.41% |     173 |
| get form fields   |   291.9 |  3.43ms |  6.83ms | ±5.09% |     146 |
| flatten form      |   123.7 |  8.09ms | 10.82ms | ±1.76% |      62 |
| fill text fields  |    79.7 | 12.55ms | 16.67ms | ±4.11% |      40 |

- **read field values** is 1.18x faster than get form fields
- **read field values** is 2.79x faster than flatten form
- **read field values** is 4.33x faster than fill text fields

## Loading

| Benchmark              | ops/sec |    Mean |     p99 |    RME | Samples |
| :--------------------- | ------: | ------: | ------: | -----: | ------: |
| load small PDF (888B)  |   15.6K |    64us |   189us | ±2.71% |   7,824 |
| load medium PDF (19KB) |   11.1K |    90us |   135us | ±0.65% |   5,571 |
| load form PDF (116KB)  |   691.7 |  1.45ms |  2.85ms | ±1.86% |     346 |
| load heavy PDF (2.0MB) |    56.3 | 17.76ms | 18.57ms | ±1.37% |      29 |

- **load small PDF (888B)** is 1.40x faster than load medium PDF (19KB)
- **load small PDF (888B)** is 22.62x faster than load form PDF (116KB)
- **load small PDF (888B)** is 277.94x faster than load heavy PDF (2.0MB)

## Saving

| Benchmark                          | ops/sec |    Mean |     p99 |    RME | Samples |
| :--------------------------------- | ------: | ------: | ------: | -----: | ------: |
| save unmodified (19KB)             |    8.4K |   119us |   346us | ±5.67% |   4,213 |
| incremental save (19KB)            |    5.6K |   179us |   361us | ±1.11% |   2,800 |
| save with modifications (19KB)     |    1.1K |   873us |  1.71ms | ±1.83% |     573 |
| save heavy PDF (2.0MB)             |    53.6 | 18.66ms | 24.83ms | ±3.31% |      27 |
| incremental save heavy PDF (2.0MB) |    49.7 | 20.14ms | 23.61ms | ±2.99% |      25 |

- **save unmodified (19KB)** is 1.50x faster than incremental save (19KB)
- **save unmodified (19KB)** is 7.36x faster than save with modifications (19KB)
- **save unmodified (19KB)** is 157.19x faster than save heavy PDF (2.0MB)
- **save unmodified (19KB)** is 169.66x faster than incremental save heavy PDF (2.0MB)

## Splitting

### Extract single page

| Benchmark                                | ops/sec |    Mean |     p99 |    RME | Samples |
| :--------------------------------------- | ------: | ------: | ------: | -----: | ------: |
| extractPages (1 page from small PDF)     |   865.0 |  1.16ms |  2.86ms | ±3.04% |     433 |
| extractPages (1 page from 100-page PDF)  |   281.2 |  3.56ms |  4.38ms | ±0.98% |     141 |
| extractPages (1 page from 2000-page PDF) |    17.7 | 56.54ms | 57.27ms | ±0.55% |      10 |

- **extractPages (1 page from small PDF)** is 3.08x faster than extractPages (1 page from 100-page PDF)
- **extractPages (1 page from small PDF)** is 48.91x faster than extractPages (1 page from 2000-page PDF)

### Split into single-page PDFs

| Benchmark                   | ops/sec |     Mean |      p99 |    RME | Samples |
| :-------------------------- | ------: | -------: | -------: | -----: | ------: |
| split 100-page PDF (0.1MB)  |    23.7 |  42.26ms |  46.58ms | ±2.86% |      12 |
| split 2000-page PDF (0.9MB) |     1.4 | 740.53ms | 740.53ms | ±0.00% |       1 |

- **split 100-page PDF (0.1MB)** is 17.52x faster than split 2000-page PDF (0.9MB)

### Batch page extraction

| Benchmark                                              | ops/sec |    Mean |     p99 |    RME | Samples |
| :----------------------------------------------------- | ------: | ------: | ------: | -----: | ------: |
| extract first 10 pages from 2000-page PDF              |    17.2 | 58.00ms | 60.08ms | ±1.18% |       9 |
| extract first 100 pages from 2000-page PDF             |    15.9 | 62.76ms | 64.88ms | ±2.19% |       8 |
| extract every 10th page from 2000-page PDF (200 pages) |    14.9 | 67.20ms | 70.33ms | ±2.13% |       8 |

- **extract first 10 pages from 2000-page PDF** is 1.08x faster than extract first 100 pages from 2000-page PDF
- **extract first 10 pages from 2000-page PDF** is 1.16x faster than extract every 10th page from 2000-page PDF (200 pages)

---

_Results are machine-dependent. Use for relative comparison only._
