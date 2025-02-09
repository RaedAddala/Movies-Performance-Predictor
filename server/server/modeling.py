from server.helper_functions_and_constants import DFS, rescale


def model(processed_data_df, year):

    cpi_df = DFS["cpi_df"]

    cpi_reference = cpi_df[cpi_df["year"] == 2023]["cpi_index"].values

    # import the models
    financial_models = DFS["financial_models"]
    artistic_models = DFS["artistic_models"]

    # financial
    best_grossWorldwide_model = financial_models["best_grossWorldwide_model"]
    best_openingWeekendGross = financial_models["best_openingWeekendGross"]
    # critique
    best_wins_model = artistic_models["best_wins_model"]
    best_nominations_model = artistic_models["best_nominations_model"]
    best_meta_score_model = artistic_models["best_meta_score_model"]
    best_IMBD_Rating_model = artistic_models["best_IMBD_Rating_model"]
    # Predict assuming using all features
    # financial
    predicted_openingWeekendGross = best_openingWeekendGross.predict(processed_data_df)
    predicted_grossWorldwide = best_grossWorldwide_model.predict(processed_data_df)
    # rescaling using cpi dict
    predicted_openingWeekendGross = rescale(
        predicted_openingWeekendGross, year, cpi_reference, cpi_df
    )
    predicted_grossWorldwide = rescale(
        predicted_grossWorldwide, year, cpi_reference, cpi_df
    )
    # critique
    predicted_wins = best_wins_model.predict(processed_data_df)
    predicted_nominations = best_nominations_model.predict(processed_data_df)
    predicted_IMBD_Rating = best_IMBD_Rating_model.predict(processed_data_df)
    predicted_meta_score = best_meta_score_model.predict(processed_data_df)
    return {
        "predicted_grossWorldwide": predicted_grossWorldwide,
        "predicted_openingWeekendGross": predicted_openingWeekendGross,
        "predicted_wins": predicted_wins,
        "predicted_nominations": predicted_nominations,
        "predicted_IMDB_Rating": predicted_IMBD_Rating,
        "predicted_meta_score": predicted_meta_score,
    }
