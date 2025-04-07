'use client';
import React, { useRef, useState } from 'react';
import { Menu, Listbox } from '@headlessui/react';
import { IoMdClose } from 'react-icons/io';
import { TbFilterShare } from 'react-icons/tb';

import Checkbox from '../Checkbox';

import styles from './styles.module.css';
import useIsMobile from '@/helpers/hooks/useIsMobile';

const Filters = ({ data, filtersState, setFilters }: any) => {
  const [selectedItems, setSelectedItems] = useState<any>({});
  const [openFilters, setOpenFilters] = useState(false);

  const isMobile = useIsMobile(501);

  const handleSelect = (filterId: any, option: any) => {
    setSelectedItems((prevState: any) => ({
      ...prevState,
      [filterId]: option,
    }));

    if (option === '') {
      setFilters(filterId, null);
    } else {
      setFilters(filterId, option.id);
    }
  };

  const handleCheckboxChange = (id: any, value: boolean) => {
    setFilters(id, value);
  };

  return (
    <div className={styles.filtersContainer}>
      {isMobile && (
        <button
          className={styles.openFiltersButton}
          onClick={() => setOpenFilters(true)}
        >
          Filters:{' '}
          <div className={styles.filtersIcon}>
            <TbFilterShare />
          </div>
        </button>
      )}
      <div
        className={`${styles.filtersWrapper} ${
          openFilters && styles.showFilters
        }`}
      >
        <div className={styles.selectFiltersContainer}>
          {isMobile && (
            <div className={styles.closeButtonContainer}>
              <button
                className={styles.closeButton}
                onClick={() => setOpenFilters(false)}
              >
                <IoMdClose />
              </button>
            </div>
          )}
          {data?.map((filter: any, index: number) => (
            <div key={filter.id}>
              {filter.type === 'Select' && (
                <div className={styles.selectFilterContainer}>
                  <Listbox>
                    {({ open }) => (
                      <>
                        <Listbox.Button
                          className={`${styles.selectFilter} ${
                            open && styles.filterActive
                          }`}
                        >
                          <div>
                            {' '}
                            {selectedItems[filter.id]
                              ? `${filter.displayName}: ${
                                  selectedItems[filter.id].displayName
                                }`
                              : filter.displayName}
                          </div>
                        </Listbox.Button>
                        <Listbox.Options className={styles.filterOptions}>
                          <Listbox.Option
                            key={filter.id}
                            value={''}
                            as={React.Fragment}
                          >
                            {({ selected = true }) => (
                              <div
                                onClick={() => handleSelect(filter.id, '')}
                                className={styles.filterOption}
                                style={{
                                  backgroundColor: selected
                                    ? 'var(--gray-4)'
                                    : 'none',
                                }}
                              >
                                All
                              </div>
                            )}
                          </Listbox.Option>
                          {filter.option.map((option: any) => (
                            <Listbox.Option
                              key={option.id}
                              value={option}
                              as={React.Fragment}
                            >
                              {({ selected }) => (
                                <div
                                  onClick={() =>
                                    handleSelect(filter.id, option)
                                  }
                                  className={styles.filterOption}
                                  style={{
                                    backgroundColor: selected
                                      ? 'var(--gray-4)'
                                      : 'none',
                                  }}
                                >
                                  {option.displayName}
                                </div>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>{' '}
                      </>
                    )}
                  </Listbox>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className={styles.checkboxFiltersContainer}>
          {data?.map((checkboxFilter: any, index: any) => {
            return (
              <>
                {checkboxFilter.type === 'Checkbox' && (
                  <div key={checkboxFilter.id}>
                    <div className={styles.checkboxesContainer}>
                      <Checkbox
                        key={checkboxFilter.id}
                        label={checkboxFilter.displayName}
                        checked={filtersState.option}
                        onChange={(event: any) =>
                          handleCheckboxChange(
                            checkboxFilter.id,
                            event.target.checked
                          )
                        }
                      />
                    </div>
                  </div>
                )}
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Filters;
