// todo for optional preview

{
  /* <Modal
        open={isOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper sx={{ p: 2, bgcolor: "lightgrey" }}>
          <Box sx={{ p: 2 }}>
            <Typography variant="h4" sx={{ marginBottom: 2 }}>
              Preview
            </Typography>
            <Typography
              variant="h5"
              sx={{
                marginBottom: 2,
                bgcolor: "white",
                p: 2,
                borderRadius: "16px",
              }}
            >
              {question}
              {question.endsWith("?") ? "" : "?"}
            </Typography>
            <Box bgcolor="white" sx={{ p: 2, borderRadius: "16px" }}>
              <RadioGroup>
              {options.map((option, index) => (
                <Paper
                  elevation={0}
                  sx={{
                    border: 1,
                    m: 1,
                    borderRadius: "15px",
                  }}
                  key={index + "pre"}
                >
                  <FormControlLabel
                    sx={{
                      width: "300px",
                      maxWidth: "300px",
                      p: 1,
                      overflow: "auto",
                    }}
                    value={index}
                    control={<Radio size="large"/>}
                    label= {option}
                  />
                   
                </Paper>
              ))}
              </RadioGroup>
            </Box>
          </Box>
          <Box
            sx={{
              p: 2,
              m: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button onClick={() => setIsOpen(false)} variant="contained">
              Close
            </Button>
          </Box>
        </Paper>
      </Modal> */
}
