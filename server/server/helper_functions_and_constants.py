import joblib
import numpy as np
import pandas as pd

DATA_PATH = "./server/data/"
DFS = {
    "actors_df": pd.read_csv(DATA_PATH + "Actors_data.csv"),
    "Writers_df": pd.read_csv(DATA_PATH + "Writers_data.csv"),
    "prod_df": pd.read_csv(DATA_PATH + "Production_companies_data.csv"),
    "loaded_objects": joblib.load(DATA_PATH + "preprocessing_objects.pkl"),
    "cpi_df": pd.read_csv(DATA_PATH + "cpi_data.csv"),
    "directors_df": pd.read_csv(DATA_PATH + "Directors_data.csv"),
    # "financial_models": joblib.load(DATA_PATH + "financial_models.pkl"),
    # "artistic_models": joblib.load(DATA_PATH + "artistic_models.pkl"),
}


def get_season(month):
    if month in [1, 2]:
        return "Beginning of the year"
    elif month in [3, 4, 5]:
        return "Spring"
    elif month in [6, 7, 8]:
        return "Summer"
    elif month in [9, 10, 11]:
        return "Autumn"
    elif month == 12:
        return "End of the year"
    else:
        return np.nan


def ignore_inflation(value, year, cpi_reference, cpi_df):
    if year > 2023:
        year = 2023

    cpi_df = DFS["cpi_df"]
    cpi_year = cpi_df[cpi_df["year"] == year]["cpi_index"].values
    return value * (cpi_reference / cpi_year[0])


def rescale(value, year, cpi_reference, cpi_df):
    if year > 2023:
        year = 2023
    cpi_year = cpi_df[cpi_df["year"] == year[0]]["cpi_index"].values
    return value / (cpi_reference / cpi_year[0])


def calculate_film_weight_normalized(actors_list):

    actors_df = DFS["actors_df"]

    total_weight = 0
    for idx, actor in enumerate(actors_list):
        if idx < 3:
            Ci = 1
        else:
            Ci = 0.9 ** (idx - 3)

        Wi = (
            actors_df[actors_df["Actor"].str.lower() == str(actor).strip().lower()][
                "weight"
            ].values[0]
            if str(actor).strip().lower() in actors_df["Actor"].str.lower().values
            else 0
        )

        total_weight += Wi * Ci
    N = len(actors_list)
    return total_weight / N if N > 0 else 0


def calculate_film_weight_normalized_writers(writers_list):

    writers_df = DFS["Writers_df"]

    total_weight = 0
    for idx, writer in enumerate(writers_list):
        Wi = (
            writers_df[writers_df["Writer"].str.lower() == str(writer).strip().lower()][
                "WriterWeight"
            ].values[0]
            if str(writer).strip().lower() in writers_df["Writer"].str.lower().values
            else 0
        )
        total_weight += Wi

    N = len(writers_list)
    return total_weight / N if N > 0 else 0


def calculate_film_weight_normalized_production_companies(production_list):

    prod_df = DFS["prod_df"]

    total_weight = 0
    Ci = 0
    list_length = len(production_list)
    for idx, production in enumerate(production_list):
        if list_length == 1:
            Ci = 1
        elif list_length == 2:
            Ci = 0.8 if idx == 0 else 0.2
        elif list_length == 3:
            if idx == 0:
                Ci = 0.8
            elif idx == 1 or idx == 2:
                Ci = 0.1

        Wi = (
            prod_df[prod_df["Company"].str.lower() == str(production).strip().lower()][
                "Production-Weight"
            ].values[0]
            if str(production).strip().lower() in prod_df["Company"].str.lower().values
            else 0
        )
        # print(production, Wi)
        total_weight += Wi * Ci

    N = len(production_list)
    return total_weight / N if N > 0 else 0
