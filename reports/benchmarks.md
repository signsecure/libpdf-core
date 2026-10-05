# Benchmark Report

> Generated on 2026-10-05 at 14:05:44 UTC
>
> System: linux | AMD EPYC 7763 64-Core Processor (4 cores) | 16GB RAM | Bun 1.4.2

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
| libpdf          |    49.4 |  20.24ms |  36.82ms | ±7.92% |      25 |
| @cantoo/pdf-lib |     4.7 | 214.53ms | 216.89ms | ±0.58% |      10 |
| pdf-lib         |     4.3 | 233.95ms | 245.39ms | ±2.27% |      10 |

- **libpdf** is 10.60x faster than @cantoo/pdf-lib
- **libpdf** is 11.56x faster than pdf-lib

### Create blank PDF

| Benchmark       | ops/sec |  Mean |    p99 |    RME | Samples |
| :-------------- | ------: | ----: | -----: | -----: | ------: |
| libpdf          |   12.9K |  77us |  159us | ±2.21% |   6,467 |
| pdf-lib         |    2.9K | 341us | 1.47ms | ±2.60% |   1,467 |
| @cantoo/pdf-lib |    2.7K | 369us | 1.71ms | ±3.62% |   1,356 |

- **libpdf** is 4.41x faster than pdf-lib
- **libpdf** is 4.77x faster than @cantoo/pdf-lib

### Add 10 pages

| Benchmark       | ops/sec |  Mean |    p99 |    RME | Samples |
| :-------------- | ------: | ----: | -----: | -----: | ------: |
| libpdf          |    8.2K | 122us |  231us | ±1.13% |   4,083 |
| @cantoo/pdf-lib |    2.4K | 415us | 2.24ms | ±3.49% |   1,207 |
| pdf-lib         |    2.3K | 441us | 1.88ms | ±4.04% |   1,136 |

- **libpdf** is 3.38x faster than @cantoo/pdf-lib
- **libpdf** is 3.60x faster than pdf-lib

### Draw 50 rectangles

| Benchmark       | ops/sec |   Mean |    p99 |    RME | Samples |
| :-------------- | ------: | -----: | -----: | -----: | ------: |
| libpdf          |    2.7K |  368us | 1.05ms | ±1.85% |   1,360 |
| pdf-lib         |   709.1 | 1.41ms | 5.54ms | ±6.94% |     355 |
| @cantoo/pdf-lib |   550.0 | 1.82ms | 9.14ms | ±8.29% |     275 |

- **libpdf** is 3.83x faster than pdf-lib
- **libpdf** is 4.94x faster than @cantoo/pdf-lib

### Load and save PDF

| Benchmark       | ops/sec |     Mean |      p99 |     RME | Samples |
| :-------------- | ------: | -------: | -------: | ------: | ------: |
| libpdf          |    49.5 |  20.21ms |  48.16ms | ±12.17% |      25 |
| pdf-lib         |     3.2 | 311.25ms | 325.36ms |  ±1.18% |      10 |
| @cantoo/pdf-lib |     1.7 | 578.85ms | 617.43ms |  ±3.27% |      10 |

- **libpdf** is 15.40x faster than pdf-lib
- **libpdf** is 28.65x faster than @cantoo/pdf-lib

### Load, modify, and save PDF

| Benchmark       | ops/sec |     Mean |      p99 |    RME | Samples |
| :-------------- | ------: | -------: | -------: | -----: | ------: |
| pdf-lib         |     3.2 | 316.83ms | 328.93ms | ±1.16% |      10 |
| libpdf          |     2.9 | 347.97ms | 366.52ms | ±1.76% |      10 |
| @cantoo/pdf-lib |     1.8 | 570.61ms | 603.41ms | ±2.36% |      10 |

- **pdf-lib** is 1.10x faster than libpdf
- **pdf-lib** is 1.80x faster than @cantoo/pdf-lib

### Extract single page from 100-page PDF

| Benchmark       | ops/sec |   Mean |     p99 |    RME | Samples |
| :-------------- | ------: | -----: | ------: | -----: | ------: |
| libpdf          |   277.6 | 3.60ms |  4.39ms | ±0.96% |     139 |
| pdf-lib         |   112.4 | 8.90ms | 10.43ms | ±1.71% |      57 |
| @cantoo/pdf-lib |   103.3 | 9.68ms | 11.95ms | ±2.33% |      52 |

- **libpdf** is 2.47x faster than pdf-lib
- **libpdf** is 2.69x faster than @cantoo/pdf-lib

### Split 100-page PDF into single-page PDFs

| Benchmark       | ops/sec |    Mean |     p99 |    RME | Samples |
| :-------------- | ------: | ------: | ------: | -----: | ------: |
| libpdf          |    24.2 | 41.39ms | 45.61ms | ±2.62% |      13 |
| pdf-lib         |    13.5 | 73.94ms | 83.72ms | ±5.87% |       7 |
| @cantoo/pdf-lib |    12.8 | 78.35ms | 82.92ms | ±3.13% |       7 |

- **libpdf** is 1.79x faster than pdf-lib
- **libpdf** is 1.89x faster than @cantoo/pdf-lib

### Split 2000-page PDF into single-page PDFs (0.9MB)

| Benchmark       | ops/sec |     Mean |      p99 |    RME | Samples |
| :-------------- | ------: | -------: | -------: | -----: | ------: |
| libpdf          |     1.3 | 782.25ms | 782.25ms | ±0.00% |       1 |
| pdf-lib         |   0.742 |    1.35s |    1.35s | ±0.00% |       1 |
| @cantoo/pdf-lib |   0.687 |    1.46s |    1.46s | ±0.00% |       1 |

- **libpdf** is 1.72x faster than pdf-lib
- **libpdf** is 1.86x faster than @cantoo/pdf-lib

### Copy 10 pages between documents

| Benchmark       | ops/sec |    Mean |     p99 |    RME | Samples |
| :-------------- | ------: | ------: | ------: | -----: | ------: |
| libpdf          |   217.2 |  4.60ms |  5.43ms | ±1.16% |     109 |
| pdf-lib         |    86.0 | 11.63ms | 13.00ms | ±1.49% |      43 |
| @cantoo/pdf-lib |    74.9 | 13.35ms | 14.75ms | ±1.80% |      38 |

- **libpdf** is 2.53x faster than pdf-lib
- **libpdf** is 2.90x faster than @cantoo/pdf-lib

### Merge 2 x 100-page PDFs

| Benchmark       | ops/sec |    Mean |     p99 |    RME | Samples |
| :-------------- | ------: | ------: | ------: | -----: | ------: |
| libpdf          |    62.3 | 16.05ms | 19.35ms | ±1.78% |      32 |
| pdf-lib         |    18.3 | 54.58ms | 63.30ms | ±4.24% |      10 |
| @cantoo/pdf-lib |    15.6 | 64.12ms | 65.71ms | ±1.32% |       8 |

- **libpdf** is 3.40x faster than pdf-lib
- **libpdf** is 3.99x faster than @cantoo/pdf-lib

### Fill FINTRAC form fields

| Benchmark       | ops/sec |    Mean |     p99 |    RME | Samples |
| :-------------- | ------: | ------: | ------: | -----: | ------: |
| libpdf          |    46.9 | 21.31ms | 24.95ms | ±2.88% |      24 |
| pdf-lib         |    35.6 | 28.10ms | 39.76ms | ±5.45% |      18 |
| @cantoo/pdf-lib |    35.5 | 28.21ms | 39.87ms | ±5.54% |      18 |

- **libpdf** is 1.32x faster than pdf-lib
- **libpdf** is 1.32x faster than @cantoo/pdf-lib

### Fill and flatten FINTRAC form

| Benchmark       | ops/sec |    Mean |     p99 |    RME | Samples |
| :-------------- | ------: | ------: | ------: | -----: | ------: |
| libpdf          |    56.4 | 17.73ms | 27.49ms | ±4.57% |      29 |
| pdf-lib         |  FAILED |       - |       - |      - |       0 |
| @cantoo/pdf-lib |    31.1 | 32.15ms | 50.34ms | ±8.44% |      16 |

- **libpdf** is 1.81x faster than @cantoo/pdf-lib

## Copying

### Copy pages between documents

| Benchmark                       | ops/sec |   Mean |    p99 |    RME | Samples |
| :------------------------------ | ------: | -----: | -----: | -----: | ------: |
| copy 1 page                     |   862.9 | 1.16ms | 2.85ms | ±4.10% |     432 |
| copy 10 pages from 100-page PDF |   213.3 | 4.69ms | 7.20ms | ±2.24% |     107 |
| copy all 100 pages              |   129.3 | 7.74ms | 8.40ms | ±0.80% |      65 |

- **copy 1 page** is 4.05x faster than copy 10 pages from 100-page PDF
- **copy 1 page** is 6.68x faster than copy all 100 pages

### Duplicate pages within same document

| Benchmark                                 | ops/sec |   Mean |    p99 |    RME | Samples |
| :---------------------------------------- | ------: | -----: | -----: | -----: | ------: |
| duplicate page 0                          |   991.4 | 1.01ms | 1.44ms | ±0.91% |     496 |
| duplicate all pages (double the document) |   983.1 | 1.02ms | 1.46ms | ±0.81% |     492 |

- **duplicate page 0** is 1.01x faster than duplicate all pages (double the document)

### Merge PDFs

| Benchmark               | ops/sec |    Mean |     p99 |    RME | Samples |
| :---------------------- | ------: | ------: | ------: | -----: | ------: |
| merge 2 small PDFs      |   638.6 |  1.57ms |  2.21ms | ±1.30% |     320 |
| merge 10 small PDFs     |   122.8 |  8.14ms | 14.54ms | ±2.74% |      62 |
| merge 2 x 100-page PDFs |    66.9 | 14.96ms | 20.84ms | ±2.60% |      34 |

- **merge 2 small PDFs** is 5.20x faster than merge 10 small PDFs
- **merge 2 small PDFs** is 9.55x faster than merge 2 x 100-page PDFs

## Drawing

| Benchmark                           | ops/sec |   Mean |    p99 |    RME | Samples |
| :---------------------------------- | ------: | -----: | -----: | -----: | ------: |
| draw 100 lines                      |    1.7K |  585us | 1.24ms | ±1.38% |     855 |
| draw 100 rectangles                 |    1.6K |  642us | 1.49ms | ±2.95% |     780 |
| draw 100 circles                    |    1.1K |  948us | 1.90ms | ±1.75% |     528 |
| create 10 pages with mixed content  |   667.0 | 1.50ms | 2.93ms | ±2.38% |     334 |
| draw 100 text lines (standard font) |   622.2 | 1.61ms | 2.61ms | ±1.63% |     312 |

- **draw 100 lines** is 1.10x faster than draw 100 rectangles
- **draw 100 lines** is 1.62x faster than draw 100 circles
- **draw 100 lines** is 2.56x faster than create 10 pages with mixed content
- **draw 100 lines** is 2.75x faster than draw 100 text lines (standard font)

## Forms

| Benchmark         | ops/sec |    Mean |     p99 |    RME | Samples |
| :---------------- | ------: | ------: | ------: | -----: | ------: |
| read field values |   346.7 |  2.88ms |  5.61ms | ±2.26% |     174 |
| get form fields   |   292.4 |  3.42ms |  6.70ms | ±4.80% |     147 |
| flatten form      |   123.5 |  8.10ms | 12.04ms | ±2.15% |      62 |
| fill text fields  |    75.3 | 13.28ms | 18.18ms | ±4.97% |      38 |

- **read field values** is 1.19x faster than get form fields
- **read field values** is 2.81x faster than flatten form
- **read field values** is 4.61x faster than fill text fields

## Loading

| Benchmark              | ops/sec |    Mean |     p99 |    RME | Samples |
| :--------------------- | ------: | ------: | ------: | -----: | ------: |
| load small PDF (888B)  |   15.7K |    64us |   183us | ±2.66% |   7,841 |
| load medium PDF (19KB) |   11.0K |    91us |   176us | ±0.75% |   5,512 |
| load form PDF (116KB)  |   786.1 |  1.27ms |  2.37ms | ±1.72% |     394 |
| load heavy PDF (2.0MB) |    54.4 | 18.37ms | 19.13ms | ±1.44% |      28 |

- **load small PDF (888B)** is 1.42x faster than load medium PDF (19KB)
- **load small PDF (888B)** is 19.95x faster than load form PDF (116KB)
- **load small PDF (888B)** is 288.13x faster than load heavy PDF (2.0MB)

## Saving

| Benchmark                          | ops/sec |    Mean |     p99 |    RME | Samples |
| :--------------------------------- | ------: | ------: | ------: | -----: | ------: |
| save unmodified (19KB)             |    9.1K |   110us |   292us | ±1.58% |   4,564 |
| incremental save (19KB)            |    6.0K |   166us |   347us | ±1.14% |   3,011 |
| save with modifications (19KB)     |    1.2K |   836us |  1.63ms | ±1.87% |     599 |
| save heavy PDF (2.0MB)             |    54.5 | 18.34ms | 20.42ms | ±1.47% |      28 |
| incremental save heavy PDF (2.0MB) |    52.5 | 19.03ms | 19.83ms | ±1.05% |      27 |

- **save unmodified (19KB)** is 1.52x faster than incremental save (19KB)
- **save unmodified (19KB)** is 7.63x faster than save with modifications (19KB)
- **save unmodified (19KB)** is 167.42x faster than save heavy PDF (2.0MB)
- **save unmodified (19KB)** is 173.69x faster than incremental save heavy PDF (2.0MB)

## Splitting

### Extract single page

| Benchmark                                | ops/sec |    Mean |     p99 |    RME | Samples |
| :--------------------------------------- | ------: | ------: | ------: | -----: | ------: |
| extractPages (1 page from small PDF)     |   857.4 |  1.17ms |  2.87ms | ±3.31% |     429 |
| extractPages (1 page from 100-page PDF)  |   282.7 |  3.54ms |  4.57ms | ±1.07% |     142 |
| extractPages (1 page from 2000-page PDF) |    17.6 | 56.75ms | 59.16ms | ±1.31% |      10 |

- **extractPages (1 page from small PDF)** is 3.03x faster than extractPages (1 page from 100-page PDF)
- **extractPages (1 page from small PDF)** is 48.66x faster than extractPages (1 page from 2000-page PDF)

### Split into single-page PDFs

| Benchmark                   | ops/sec |     Mean |      p99 |    RME | Samples |
| :-------------------------- | ------: | -------: | -------: | -----: | ------: |
| split 100-page PDF (0.1MB)  |    23.9 |  41.86ms |  47.45ms | ±3.46% |      12 |
| split 2000-page PDF (0.9MB) |     1.3 | 748.26ms | 748.26ms | ±0.00% |       1 |

- **split 100-page PDF (0.1MB)** is 17.87x faster than split 2000-page PDF (0.9MB)

### Batch page extraction

| Benchmark                                              | ops/sec |    Mean |     p99 |    RME | Samples |
| :----------------------------------------------------- | ------: | ------: | ------: | -----: | ------: |
| extract first 10 pages from 2000-page PDF              |    17.3 | 57.70ms | 59.78ms | ±1.19% |       9 |
| extract first 100 pages from 2000-page PDF             |    16.3 | 61.29ms | 63.26ms | ±1.90% |       9 |
| extract every 10th page from 2000-page PDF (200 pages) |    14.9 | 66.96ms | 69.39ms | ±1.55% |       8 |

- **extract first 10 pages from 2000-page PDF** is 1.06x faster than extract first 100 pages from 2000-page PDF
- **extract first 10 pages from 2000-page PDF** is 1.16x faster than extract every 10th page from 2000-page PDF (200 pages)

---

_Results are machine-dependent. Use for relative comparison only._
