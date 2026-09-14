# Benchmark Report

> Generated on 2026-09-14 at 12:17:23 UTC
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
| libpdf          |    54.9 |  18.22ms |  19.61ms | ±1.64% |      28 |
| @cantoo/pdf-lib |     4.7 | 211.84ms | 216.15ms | ±0.72% |      10 |
| pdf-lib         |     4.6 | 219.10ms | 228.13ms | ±1.27% |      10 |

- **libpdf** is 11.63x faster than @cantoo/pdf-lib
- **libpdf** is 12.03x faster than pdf-lib

### Create blank PDF

| Benchmark       | ops/sec |  Mean |    p99 |    RME | Samples |
| :-------------- | ------: | ----: | -----: | -----: | ------: |
| libpdf          |   14.4K |  70us |  159us | ±2.18% |   7,184 |
| pdf-lib         |    3.1K | 328us | 1.33ms | ±2.33% |   1,527 |
| @cantoo/pdf-lib |    2.7K | 373us | 1.61ms | ±2.63% |   1,341 |

- **libpdf** is 4.71x faster than pdf-lib
- **libpdf** is 5.36x faster than @cantoo/pdf-lib

### Add 10 pages

| Benchmark       | ops/sec |  Mean |    p99 |    RME | Samples |
| :-------------- | ------: | ----: | -----: | -----: | ------: |
| libpdf          |    8.0K | 125us |  238us | ±1.01% |   4,001 |
| @cantoo/pdf-lib |    2.3K | 430us | 2.20ms | ±4.43% |   1,163 |
| pdf-lib         |    2.2K | 448us | 1.97ms | ±3.46% |   1,118 |

- **libpdf** is 3.44x faster than @cantoo/pdf-lib
- **libpdf** is 3.58x faster than pdf-lib

### Draw 50 rectangles

| Benchmark       | ops/sec |   Mean |    p99 |    RME | Samples |
| :-------------- | ------: | -----: | -----: | -----: | ------: |
| libpdf          |    2.9K |  348us |  805us | ±1.22% |   1,436 |
| pdf-lib         |   721.9 | 1.39ms | 5.54ms | ±7.25% |     362 |
| @cantoo/pdf-lib |   566.7 | 1.76ms | 5.65ms | ±6.89% |     284 |

- **libpdf** is 3.98x faster than pdf-lib
- **libpdf** is 5.07x faster than @cantoo/pdf-lib

### Load and save PDF

| Benchmark       | ops/sec |     Mean |      p99 |    RME | Samples |
| :-------------- | ------: | -------: | -------: | -----: | ------: |
| libpdf          |    52.0 |  19.23ms |  34.27ms | ±6.28% |      27 |
| pdf-lib         |     3.2 | 313.31ms | 330.53ms | ±1.71% |      10 |
| @cantoo/pdf-lib |     1.7 | 585.75ms | 604.60ms | ±0.89% |      10 |

- **libpdf** is 16.29x faster than pdf-lib
- **libpdf** is 30.45x faster than @cantoo/pdf-lib

### Load, modify, and save PDF

| Benchmark       | ops/sec |     Mean |      p99 |    RME | Samples |
| :-------------- | ------: | -------: | -------: | -----: | ------: |
| pdf-lib         |     3.2 | 307.70ms | 323.63ms | ±1.49% |      10 |
| libpdf          |     3.0 | 328.95ms | 344.75ms | ±1.72% |      10 |
| @cantoo/pdf-lib |     1.7 | 583.63ms | 603.41ms | ±1.08% |      10 |

- **pdf-lib** is 1.07x faster than libpdf
- **pdf-lib** is 1.90x faster than @cantoo/pdf-lib

### Extract single page from 100-page PDF

| Benchmark       | ops/sec |   Mean |     p99 |    RME | Samples |
| :-------------- | ------: | -----: | ------: | -----: | ------: |
| libpdf          |   283.2 | 3.53ms |  4.07ms | ±0.65% |     142 |
| pdf-lib         |   116.2 | 8.60ms | 10.10ms | ±1.21% |      59 |
| @cantoo/pdf-lib |   108.8 | 9.19ms | 11.31ms | ±1.82% |      55 |

- **libpdf** is 2.44x faster than pdf-lib
- **libpdf** is 2.60x faster than @cantoo/pdf-lib

### Split 100-page PDF into single-page PDFs

| Benchmark       | ops/sec |    Mean |     p99 |    RME | Samples |
| :-------------- | ------: | ------: | ------: | -----: | ------: |
| libpdf          |    25.1 | 39.77ms | 41.24ms | ±1.28% |      13 |
| pdf-lib         |    14.2 | 70.49ms | 78.78ms | ±5.55% |       8 |
| @cantoo/pdf-lib |    13.5 | 74.20ms | 79.93ms | ±4.97% |       7 |

- **libpdf** is 1.77x faster than pdf-lib
- **libpdf** is 1.87x faster than @cantoo/pdf-lib

### Split 2000-page PDF into single-page PDFs (0.9MB)

| Benchmark       | ops/sec |     Mean |      p99 |    RME | Samples |
| :-------------- | ------: | -------: | -------: | -----: | ------: |
| libpdf          |     1.3 | 747.45ms | 747.45ms | ±0.00% |       1 |
| pdf-lib         |   0.768 |    1.30s |    1.30s | ±0.00% |       1 |
| @cantoo/pdf-lib |   0.715 |    1.40s |    1.40s | ±0.00% |       1 |

- **libpdf** is 1.74x faster than pdf-lib
- **libpdf** is 1.87x faster than @cantoo/pdf-lib

### Copy 10 pages between documents

| Benchmark       | ops/sec |    Mean |     p99 |    RME | Samples |
| :-------------- | ------: | ------: | ------: | -----: | ------: |
| libpdf          |   222.6 |  4.49ms |  5.25ms | ±0.83% |     112 |
| pdf-lib         |    86.9 | 11.51ms | 13.76ms | ±1.58% |      44 |
| @cantoo/pdf-lib |    78.1 | 12.80ms | 14.51ms | ±1.34% |      40 |

- **libpdf** is 2.56x faster than pdf-lib
- **libpdf** is 2.85x faster than @cantoo/pdf-lib

### Merge 2 x 100-page PDFs

| Benchmark       | ops/sec |    Mean |     p99 |    RME | Samples |
| :-------------- | ------: | ------: | ------: | -----: | ------: |
| libpdf          |    66.9 | 14.94ms | 15.45ms | ±0.85% |      34 |
| pdf-lib         |    19.3 | 51.89ms | 54.19ms | ±1.82% |      10 |
| @cantoo/pdf-lib |    16.2 | 61.85ms | 63.21ms | ±1.46% |       9 |

- **libpdf** is 3.47x faster than pdf-lib
- **libpdf** is 4.14x faster than @cantoo/pdf-lib

### Fill FINTRAC form fields

| Benchmark       | ops/sec |    Mean |     p99 |    RME | Samples |
| :-------------- | ------: | ------: | ------: | -----: | ------: |
| libpdf          |    49.5 | 20.20ms | 25.62ms | ±3.68% |      25 |
| pdf-lib         |    37.9 | 26.41ms | 35.47ms | ±4.48% |      19 |
| @cantoo/pdf-lib |    37.1 | 26.94ms | 37.36ms | ±6.04% |      19 |

- **libpdf** is 1.31x faster than pdf-lib
- **libpdf** is 1.33x faster than @cantoo/pdf-lib

### Fill and flatten FINTRAC form

| Benchmark       | ops/sec |    Mean |     p99 |    RME | Samples |
| :-------------- | ------: | ------: | ------: | -----: | ------: |
| libpdf          |    57.9 | 17.26ms | 20.58ms | ±3.08% |      30 |
| pdf-lib         |  FAILED |       - |       - |      - |       0 |
| @cantoo/pdf-lib |    31.5 | 31.77ms | 44.58ms | ±6.72% |      16 |

- **libpdf** is 1.84x faster than @cantoo/pdf-lib

## Copying

### Copy pages between documents

| Benchmark                       | ops/sec |   Mean |     p99 |    RME | Samples |
| :------------------------------ | ------: | -----: | ------: | -----: | ------: |
| copy 1 page                     |   870.9 | 1.15ms |  2.74ms | ±3.11% |     436 |
| copy 10 pages from 100-page PDF |   215.9 | 4.63ms |  7.37ms | ±1.94% |     108 |
| copy all 100 pages              |   129.9 | 7.70ms | 11.57ms | ±1.67% |      65 |

- **copy 1 page** is 4.03x faster than copy 10 pages from 100-page PDF
- **copy 1 page** is 6.70x faster than copy all 100 pages

### Duplicate pages within same document

| Benchmark                                 | ops/sec |   Mean |    p99 |    RME | Samples |
| :---------------------------------------- | ------: | -----: | -----: | -----: | ------: |
| duplicate page 0                          |    1.0K |  999us | 1.33ms | ±0.74% |     501 |
| duplicate all pages (double the document) |   999.7 | 1.00ms | 1.40ms | ±0.81% |     500 |

- **duplicate page 0** is 1.00x faster than duplicate all pages (double the document)

### Merge PDFs

| Benchmark               | ops/sec |    Mean |     p99 |    RME | Samples |
| :---------------------- | ------: | ------: | ------: | -----: | ------: |
| merge 2 small PDFs      |   646.4 |  1.55ms |  2.06ms | ±1.00% |     324 |
| merge 10 small PDFs     |   124.4 |  8.04ms | 12.22ms | ±2.43% |      63 |
| merge 2 x 100-page PDFs |    69.4 | 14.40ms | 15.31ms | ±0.91% |      35 |

- **merge 2 small PDFs** is 5.20x faster than merge 10 small PDFs
- **merge 2 small PDFs** is 9.31x faster than merge 2 x 100-page PDFs

## Drawing

| Benchmark                           | ops/sec |   Mean |    p99 |    RME | Samples |
| :---------------------------------- | ------: | -----: | -----: | -----: | ------: |
| draw 100 lines                      |    1.8K |  561us | 1.14ms | ±1.18% |     891 |
| draw 100 rectangles                 |    1.6K |  631us | 1.47ms | ±2.78% |     793 |
| draw 100 circles                    |    1.1K |  922us | 1.72ms | ±1.42% |     543 |
| create 10 pages with mixed content  |   679.7 | 1.47ms | 2.66ms | ±2.26% |     340 |
| draw 100 text lines (standard font) |   622.4 | 1.61ms | 2.73ms | ±1.78% |     312 |

- **draw 100 lines** is 1.12x faster than draw 100 rectangles
- **draw 100 lines** is 1.64x faster than draw 100 circles
- **draw 100 lines** is 2.62x faster than create 10 pages with mixed content
- **draw 100 lines** is 2.86x faster than draw 100 text lines (standard font)

## Forms

| Benchmark         | ops/sec |    Mean |     p99 |    RME | Samples |
| :---------------- | ------: | ------: | ------: | -----: | ------: |
| read field values |   357.1 |  2.80ms |  5.07ms | ±1.65% |     179 |
| get form fields   |   309.5 |  3.23ms |  6.82ms | ±3.98% |     155 |
| flatten form      |   124.8 |  8.01ms | 10.91ms | ±1.58% |      63 |
| fill text fields  |    82.3 | 12.15ms | 15.52ms | ±3.29% |      42 |

- **read field values** is 1.15x faster than get form fields
- **read field values** is 2.86x faster than flatten form
- **read field values** is 4.34x faster than fill text fields

## Loading

| Benchmark              | ops/sec |    Mean |     p99 |    RME | Samples |
| :--------------------- | ------: | ------: | ------: | -----: | ------: |
| load small PDF (888B)  |   16.5K |    61us |   188us | ±0.93% |   8,264 |
| load medium PDF (19KB) |   11.1K |    90us |   171us | ±0.52% |   5,558 |
| load form PDF (116KB)  |   741.0 |  1.35ms |  2.53ms | ±1.73% |     371 |
| load heavy PDF (2.0MB) |    55.6 | 17.99ms | 25.33ms | ±3.61% |      28 |

- **load small PDF (888B)** is 1.49x faster than load medium PDF (19KB)
- **load small PDF (888B)** is 22.30x faster than load form PDF (116KB)
- **load small PDF (888B)** is 297.29x faster than load heavy PDF (2.0MB)

## Saving

| Benchmark                          | ops/sec |    Mean |     p99 |    RME | Samples |
| :--------------------------------- | ------: | ------: | ------: | -----: | ------: |
| save unmodified (19KB)             |    9.0K |   111us |   362us | ±1.71% |   4,500 |
| incremental save (19KB)            |    5.8K |   173us |   377us | ±1.18% |   2,898 |
| save with modifications (19KB)     |    1.3K |   789us |  1.49ms | ±1.19% |     634 |
| save heavy PDF (2.0MB)             |    55.1 | 18.15ms | 18.71ms | ±0.86% |      28 |
| incremental save heavy PDF (2.0MB) |    51.7 | 19.33ms | 22.46ms | ±1.61% |      26 |

- **save unmodified (19KB)** is 1.55x faster than incremental save (19KB)
- **save unmodified (19KB)** is 7.10x faster than save with modifications (19KB)
- **save unmodified (19KB)** is 163.37x faster than save heavy PDF (2.0MB)
- **save unmodified (19KB)** is 173.94x faster than incremental save heavy PDF (2.0MB)

## Splitting

### Extract single page

| Benchmark                                | ops/sec |    Mean |     p99 |    RME | Samples |
| :--------------------------------------- | ------: | ------: | ------: | -----: | ------: |
| extractPages (1 page from small PDF)     |   925.8 |  1.08ms |  2.12ms | ±2.36% |     463 |
| extractPages (1 page from 100-page PDF)  |   280.5 |  3.57ms |  4.08ms | ±1.37% |     141 |
| extractPages (1 page from 2000-page PDF) |    17.8 | 56.22ms | 64.99ms | ±3.98% |      10 |

- **extractPages (1 page from small PDF)** is 3.30x faster than extractPages (1 page from 100-page PDF)
- **extractPages (1 page from small PDF)** is 52.05x faster than extractPages (1 page from 2000-page PDF)

### Split into single-page PDFs

| Benchmark                   | ops/sec |     Mean |      p99 |    RME | Samples |
| :-------------------------- | ------: | -------: | -------: | -----: | ------: |
| split 100-page PDF (0.1MB)  |    24.5 |  40.84ms |  45.10ms | ±2.18% |      13 |
| split 2000-page PDF (0.9MB) |     1.4 | 735.88ms | 735.88ms | ±0.00% |       1 |

- **split 100-page PDF (0.1MB)** is 18.02x faster than split 2000-page PDF (0.9MB)

### Batch page extraction

| Benchmark                                              | ops/sec |    Mean |     p99 |    RME | Samples |
| :----------------------------------------------------- | ------: | ------: | ------: | -----: | ------: |
| extract first 10 pages from 2000-page PDF              |    17.8 | 56.13ms | 57.03ms | ±0.69% |       9 |
| extract first 100 pages from 2000-page PDF             |    16.7 | 59.94ms | 61.77ms | ±1.41% |       9 |
| extract every 10th page from 2000-page PDF (200 pages) |    15.4 | 65.08ms | 67.14ms | ±1.36% |       8 |

- **extract first 10 pages from 2000-page PDF** is 1.07x faster than extract first 100 pages from 2000-page PDF
- **extract first 10 pages from 2000-page PDF** is 1.16x faster than extract every 10th page from 2000-page PDF (200 pages)

---

_Results are machine-dependent. Use for relative comparison only._
